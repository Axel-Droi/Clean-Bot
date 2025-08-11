const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

/**
 * Main detection endpoint
 * POST /detect
 */
router.post('/detect', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No image file provided'
    });
  }

  const imagePath = req.file.path;
  const startTime = Date.now();

  try {
    // Call Python AI model
    const result = await runAIDetection(imagePath);
    const processTime = (Date.now() - startTime) / 1000;

    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    // Return results
    res.json({
      success: true,
      result: {
        ...result,
        processTime
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Detection error:', error);
    
    // Clean up uploaded file on error
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(500).json({
      success: false,
      error: 'AI model processing failed',
      details: error.message
    });
  }
});

/**
 * Health check endpoint
 * GET /health
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'AI Detection API',
    timestamp: new Date().toISOString(),
    python_model: checkPythonModel()
  });
});

/**
 * Model information endpoint
 * GET /model-info
 */
router.get('/model-info', (req, res) => {
  res.json({
    success: true,
    model: {
      name: 'YOLOv8 Trash Detection',
      version: '1.0.0',
      architecture: 'YOLOv8n',
      parameters: '3.0M',
      size: '6.2MB',
      input_resolution: '640x640',
      dataset: 'TACO',
      training_images: 1200,
      validation_images: 300,
      classes: ['trash'],
      performance: {
        precision: 0.489,
        recall: 0.345,
        map_50: 0.329,
        map_50_95: 0.201
      }
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * Run AI detection using Python script
 */
async function runAIDetection(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonPath = path.join(__dirname, '.venv', 'bin', 'python');
    const scriptPath = path.join(__dirname, 'AI-Model', 'main.py');
    
    // Run Python detection script
    const pythonProcess = spawn(pythonPath, [scriptPath, 'detect', imagePath], {
      cwd: __dirname
    });

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', errorOutput);
        reject(new Error(`Python script failed with code ${code}: ${errorOutput}`));
        return;
      }

      try {
        // Parse the output from Python script
        const lines = output.trim().split('\n');
        const resultLine = lines[lines.length - 1];
        
        if (resultLine.startsWith('{')) {
          // JSON output from Python script
          const result = JSON.parse(resultLine);
          resolve(result);
        } else {
          // Simple boolean output (legacy format)
          const isTrash = resultLine.toLowerCase().includes('true') || 
                          resultLine.toLowerCase().includes('trash detected');
          
          resolve({
            trashDetected: isTrash,
            confidence: isTrash ? 0.75 : 0.25,
            detections: isTrash ? [{
              class: 'trash',
              confidence: 0.75,
              bbox: [100, 100, 200, 200]
            }] : []
          });
        }
      } catch (parseError) {
        console.error('Error parsing Python output:', parseError);
        console.error('Raw output:', output);
        reject(new Error('Failed to parse AI model output'));
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      reject(new Error('Failed to start AI model process'));
    });
  });
}

/**
 * Check if Python model is available
 */
function checkPythonModel() {
  const pythonPath = path.join(__dirname, '.venv', 'bin', 'python');
  const scriptPath = path.join(__dirname, 'AI-Model', 'main.py');
  const modelPath = path.join(__dirname, 'runs', 'detect', 'train2', 'weights', 'best.pt');
  
  return {
    python_executable: fs.existsSync(pythonPath),
    main_script: fs.existsSync(scriptPath),
    trained_model: fs.existsSync(modelPath),
    ready: fs.existsSync(pythonPath) && fs.existsSync(scriptPath) && fs.existsSync(modelPath)
  };
}

module.exports = router;
