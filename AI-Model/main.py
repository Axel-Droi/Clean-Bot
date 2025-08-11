"""YOLOv8 Trash Detection

Usage:
  # 1. Install deps (prefer venv):
  #    pip install ultralytics opencv-python pillow numpy
  # 2. Prepare dataset + data.yaml (example template below) and run training:
  #    python main.py --train --data data.yaml --model yolov8n.pt --epochs 50
  # 3. Single image boolean check:
  #    python main.py --source path/to/image.jpg
  # 4. Webcam / video stream (press q to quit):
  #    python main.py --source 0
  # 5. Programmatic use:
  #    from main import is_trash; print(is_trash('image.jpg'))

Example data.yaml (place beside this file):
-------------------------------------------------
# data.yaml
path: ./dataset            # root dir
train: images/train        # images
val: images/val            # images
# (optional) test: images/test
names:
  0: trash                 # single-class (trash)
# If multi-class (bottle, can, paper, etc.) list them all; code below can map them to trash.
-------------------------------------------------

Notes:
- Start with yolov8n.pt (fast) then try yolov8s/ m for better accuracy.
- Adjust confidence threshold via --conf.
"""
from __future__ import annotations
import argparse
import json
import os
import sys
from typing import List, Iterable, Union

try:
    from ultralytics import YOLO
except ImportError as e:  # Help user if package missing
    print("Ultralytics not installed. Run: pip install ultralytics", file=sys.stderr)
    raise

try:
    import cv2  # type: ignore
except ImportError:
    cv2 = None  # Only needed for video/webcam

DEFAULT_MODEL_PATH = "runs/detect/trash/best.pt"  # Will be created after training (customize)

# If your dataset has ONLY one class 'trash', leave MULTI_CLASS_TRASH_MAPPING empty.
# If multiple classes (e.g. bottle, can, wrapper) and all count as trash, list them.
MULTI_CLASS_TRASH_MAPPING: List[str] = []  # e.g.: ["bottle", "can", "wrapper", "paper", "plastic_bag"]


def load_model(model_path: str) -> YOLO:
    if not os.path.isfile(model_path):
        # Fall back to base model for first inference (will still return False often until trained)
        print(f"[INFO] Custom model '{model_path}' not found. Falling back to yolov8n.pt pretrained weights.")
        return YOLO("yolov8n.pt")
    return YOLO(model_path)


def train(data: str, model: str, epochs: int, imgsz: int, batch: int) -> str:
    """Train a YOLOv8 model. Returns path to best weights."""
    yolo = YOLO(model)  # can be 'yolov8n.pt' or previous best
    results = yolo.train(data=data, epochs=epochs, imgsz=imgsz, batch=batch, project="runs/detect", name="trash")
    # Ultralytics saves best weights as runs/detect/trash/weights/best.pt
    best = os.path.join(results.save_dir, "weights", "best.pt")
    print(f"[INFO] Training complete. Best weights: {best}")
    return best


def _any_trash_from_result(result, trash_class_names: List[str], conf_thres: float) -> bool:
    # result.names: dict[int, str]
    if result.boxes is None:
        return False
    names_map = result.names  # id -> name
    for box in result.boxes:  # type: ignore[attr-defined]
        c = int(box.cls.item())
        name = names_map.get(c, str(c))
        conf = float(box.conf.item()) if box.conf is not None else 0.0
        if conf >= conf_thres:
            if not trash_class_names:  # single-class 'trash'
                return True
            if name in trash_class_names:
                return True
    return False


def detect_boolean(model: YOLO, source: Union[str, int], conf: float = 0.4, show: bool = False) -> bool:
    """Return True if any trash detected above confidence threshold in image / video frame(s).
    For a video/webcam source, returns True if ANY frame contains trash. Stops early if found."""
    # Streaming inference for performance
    found = False
    for result in model(source, stream=True, conf=conf):  # type: ignore[call-arg]
        if _any_trash_from_result(result, MULTI_CLASS_TRASH_MAPPING, conf):
            found = True
            if show and hasattr(result, 'plot'):
                plotted = result.plot()  # numpy array (BGR)
                if cv2 is not None:
                    cv2.imshow("Trash Detected", plotted)
                    cv2.waitKey(1)
            break  # Early exit after first positive
        if show and hasattr(result, 'plot'):
            if cv2 is not None:
                cv2.imshow("Frame", result.plot())
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
    if show and cv2 is not None:
        cv2.destroyAllWindows()
    return found


def detect_detailed(model: YOLO, image_path: str, conf: float = 0.4):
    """Return detailed detection results for a single image suitable for API JSON output."""
    results = model(image_path, conf=conf)
    detections = []
    trash_detected = False
    if results:
        r = results[0]
        names_map = r.names
        if r.boxes is not None:
            for box in r.boxes:  # type: ignore[attr-defined]
                c = int(box.cls.item())
                name = names_map.get(c, str(c))
                score = float(box.conf.item()) if box.conf is not None else 0.0
                if score >= conf:
                    if not MULTI_CLASS_TRASH_MAPPING or name in MULTI_CLASS_TRASH_MAPPING:
                        trash_detected = True
                    xyxy = box.xyxy[0].tolist() if hasattr(box, 'xyxy') else [0,0,0,0]
                    detections.append({
                        'class': name,
                        'confidence': score,
                        'bbox': [float(x) for x in xyxy]
                    })
    confidence = 0.0
    if detections:
        confidence = max(d['confidence'] for d in detections)
    return {
        'trashDetected': trash_detected,
        'confidence': confidence,
        'detections': detections
    }


def is_trash(image_path: str, model_path: str = DEFAULT_MODEL_PATH, conf: float = 0.4) -> bool:
    """Convenience function for single-image boolean classification."""
    model = load_model(model_path)
    return detect_boolean(model, image_path, conf=conf, show=False)


def export(model_path: str, fmt: str = "onnx") -> str:
    model = load_model(model_path)
    out = model.export(format=fmt)
    print(f"[INFO] Exported to {out}")
    return out


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="YOLOv8 Trash Boolean Detector")
    p.add_argument('--train', action='store_true', help='Run training flow')
    p.add_argument('--data', type=str, default='data.yaml', help='Path to data.yaml')
    p.add_argument('--model', type=str, default='yolov8n.pt', help='Base or existing model path for training')
    p.add_argument('--epochs', type=int, default=50)
    p.add_argument('--imgsz', type=int, default=640)
    p.add_argument('--batch', type=int, default=16)
    p.add_argument('--source', type=str, help='Image / video path or webcam index ("0") for boolean detection')
    p.add_argument('--conf', type=float, default=0.4, help='Confidence threshold')
    p.add_argument('--show', action='store_true', help='Show annotated frames (video)')
    p.add_argument('--export', action='store_true', help='Export trained model (ONNX)')
    p.add_argument('--export-format', type=str, default='onnx', help='Export format (onnx, openvino, tflite, etc.)')
    p.add_argument('--weights', type=str, default=DEFAULT_MODEL_PATH, help='Custom weights path for inference/export')
    return p.parse_args()


def main():
    args = parse_args()

    if args.train:
        best = train(args.data, args.model, args.epochs, args.imgsz, args.batch)
        print(f"BEST_WEIGHTS={best}")
        # Optionally update default path
    if args.source is not None:
        model = load_model(args.weights)
        src: Union[str, int]
        if args.source.isdigit() and len(args.source) == 1:
            src = int(args.source)
        else:
            src = args.source
        # If single image file, provide JSON detailed output
        if isinstance(src, str) and os.path.isfile(src):
            result = detect_detailed(model, src, conf=args.conf)
            print(json.dumps(result))
        else:
            result_bool = detect_boolean(model, src, conf=args.conf, show=args.show)
            print("true" if result_bool else "false")
    if args.export:
        export(args.weights, args.export_format)

    if (not args.train) and args.source is None and not args.export:
        print("Nothing to do. Use --train or --source or --export. -h for help.")


if __name__ == '__main__':
    main()
