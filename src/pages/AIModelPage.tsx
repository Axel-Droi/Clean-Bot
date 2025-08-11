import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Upload, 
  Brain, 
  Zap, 
  Target, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import aiModelService, { DetectionResult } from '@/services/aiModelService';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const AIModelPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState<DetectionResult | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detection function using real AI service or mock
  const detectTrash = async (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setError(null);

    try {
      // Simulate progress for demo
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Try real API first, fallback to mock
      let response;
      try {
        response = await aiModelService.detectTrashInImage(file);
      } catch (apiError) {
        console.warn('API unavailable, using mock detection:', apiError);
        response = await aiModelService.mockDetection('uploaded-image');
      }
      
      clearInterval(interval);
      setProcessingProgress(100);
      setDetectionResults(response.result);
    } catch (error) {
      console.error('Detection failed:', error);
      setError('Detection failed. Please try again.');
      setDetectionResults(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        setDetectionResults(null);
        detectTrash(file); // Pass the file object for real API
      };
      reader.readAsDataURL(file);
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsWebcamActive(true);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsWebcamActive(false);
    }
  };

  const captureFrame = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      const imageUrl = canvas.toDataURL();
      setSelectedImage(imageUrl);
      
      // Convert canvas to blob and then to file for detection
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
          await detectTrash(file);
        }
      }, 'image/jpeg', 0.8);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
      <Navigation />
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <ScrollReveal yOffset={24}>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                AI Trash Detection Model
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Advanced YOLOv8 neural network trained on 1,500+ images to detect and classify trash in real-time
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="demo" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="demo">Live Demo</TabsTrigger>
            <TabsTrigger value="info">Model Info</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Live Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <ScrollReveal yOffset={40}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Test the AI Model
                    </CardTitle>
                    <CardDescription>
                      Upload an image or use your webcam to test trash detection
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Upload Button */}
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                      variant="outline"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {/* Webcam Controls */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button 
                          onClick={isWebcamActive ? stopWebcam : startWebcam}
                          variant={isWebcamActive ? "destructive" : "default"}
                          className="flex-1"
                        >
                          {isWebcamActive ? (
                            <><Pause className="w-4 h-4 mr-2" /> Stop Webcam</>
                          ) : (
                            <><Play className="w-4 h-4 mr-2" /> Start Webcam</>
                          )}
                        </Button>
                        {isWebcamActive && (
                          <Button onClick={captureFrame} variant="outline">
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      {isWebcamActive && (
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          className="w-full rounded-lg border"
                        />
                      )}
                    </div>

                    {/* Selected Image Preview */}
                    {selectedImage && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">Selected Image:</h4>
                        <img 
                          src={selectedImage} 
                          alt="Selected" 
                          className="w-full rounded-lg border"
                        />
                      </div>
                    )}

                    {/* Error Display */}
                    {error && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Processing Progress */}
                    {isProcessing && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 animate-pulse text-yellow-500" />
                          <span className="text-sm font-medium">Processing...</span>
                        </div>
                        <Progress value={processingProgress} className="w-full" />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Results Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Detection Results
                    </CardTitle>
                    <CardDescription>
                      AI analysis and trash detection confidence
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!detectionResults && !isProcessing && (
                      <div className="text-center py-8 text-gray-500">
                        <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Upload an image or use webcam to see results</p>
                      </div>
                    )}

                    {detectionResults && (
                      <div className="space-y-4">
                        <Alert className={detectionResults.trashDetected ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                          <AlertTriangle className={`w-4 h-4 ${detectionResults.trashDetected ? "text-red-600" : "text-green-600"}`} />
                          <AlertTitle>
                            {detectionResults.trashDetected ? "Trash Detected!" : "No Trash Detected"}
                          </AlertTitle>
                          <AlertDescription>
                            Confidence: {(detectionResults.confidence * 100).toFixed(1)}%
                          </AlertDescription>
                        </Alert>

                        {detectionResults.detections.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold">Detected Objects:</h4>
                            {detectionResults.detections.map((detection: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="capitalize">{detection.class.replace('_', ' ')}</span>
                                <Badge variant="secondary">
                                  {(detection.confidence * 100).toFixed(1)}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </TabsContent>

          {/* Model Info Tab */}
          <TabsContent value="info" className="space-y-6">
            <ScrollReveal yOffset={40}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-semibold">YOLOv8n</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Parameters:</span>
                        <span className="font-semibold">3.0M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-semibold">6.2 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Input:</span>
                        <span className="font-semibold">640x640</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      Training Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dataset:</span>
                        <span className="font-semibold">TACO</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Training Images:</span>
                        <span className="font-semibold">1,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Validation:</span>
                        <span className="font-semibold">300</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Classes:</span>
                        <span className="font-semibold">1 (Trash)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precision:</span>
                        <span className="font-semibold">48.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recall:</span>
                        <span className="font-semibold">34.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">mAP@50:</span>
                        <span className="font-semibold">32.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inference:</span>
                        <span className="font-semibold">~50ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal yOffset={40} delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>About the Model</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    Our AI trash detection model is built using YOLOv8 (You Only Look Once), a state-of-the-art 
                    real-time object detection algorithm. The model has been specifically trained on the TACO 
                    (Trash Annotations in Context) dataset to identify various types of litter and trash in 
                    real-world environments.
                  </p>
                  <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Real-time trash detection with bounding box predictions</li>
                    <li>Trained on diverse outdoor environments and lighting conditions</li>
                    <li>Optimized for edge deployment with minimal computational requirements</li>
                    <li>Supports both image upload and live webcam detection</li>
                    <li>Confidence scoring for each detection</li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <ScrollReveal yOffset={40}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Metrics</CardTitle>
                    <CardDescription>Model performance during training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Precision</span>
                          <span>48.9%</span>
                        </div>
                        <Progress value={48.9} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Recall</span>
                          <span>34.5%</span>
                        </div>
                        <Progress value={34.5} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>mAP@50</span>
                          <span>32.9%</span>
                        </div>
                        <Progress value={32.9} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>mAP@50-95</span>
                          <span>20.1%</span>
                        </div>
                        <Progress value={20.1} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                    <CardDescription>Deployment and runtime information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>CPU Compatible</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>GPU Accelerated</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Mobile Optimized</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Real-time Processing</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal yOffset={40} delay={0.1}>
              <Alert>
                <Info className="w-4 h-4" />
                <AlertTitle>Model Improvements</AlertTitle>
                <AlertDescription>
                  This is an initial training run with 2 epochs. For production use, we recommend training 
                  for 50+ epochs, data augmentation, and hyperparameter tuning to achieve better performance.
                </AlertDescription>
              </Alert>
            </ScrollReveal>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AIModelPage;
