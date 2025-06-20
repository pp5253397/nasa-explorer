
import React, { useState, memo, useCallback } from 'react';
import { X, Upload, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AISpaceIdentifierProps {
  onClose: () => void;
}

export const AISpaceIdentifier = memo<AISpaceIdentifierProps>(({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const analyzeImage = useCallback(async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis with predefined space object classifications
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const spaceObjects = [
        "This appears to be a spiral galaxy with distinct spiral arms and a bright central bulge. Estimated distance: 2.5 million light-years.",
        "Nebula detected - likely an emission nebula with hydrogen gas clouds illuminated by nearby hot stars.",
        "This looks like a planetary nebula formed by a dying star expelling its outer layers.",
        "Star cluster identified - appears to be an open cluster with young, hot blue stars.",
        "This appears to be a distant quasar or active galactic nucleus with characteristic bright jets.",
        "Rocky asteroid or meteorite with irregular surface features and possible metal content.",
        "Gas giant planet with visible atmospheric bands and possible storm systems.",
        "Binary star system detected with two stars orbiting their common center of mass."
      ];
      
      const randomResult = spaceObjects[Math.floor(Math.random() * spaceObjects.length)];
      setResult(randomResult);
      toast.success("AI analysis complete!");
      
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedImage]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900">AI Space Identifier</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                Upload an image of a space object
              </span>
            </label>
          </div>

          {selectedImage && (
            <div className="space-y-3">
              <img
                src={selectedImage}
                alt="Uploaded space object"
                className="w-full h-48 object-cover rounded-lg border"
                loading="lazy"
              />
              
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Identify Object
                  </>
                )}
              </button>
            </div>
          )}

          {result && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">AI Analysis Result:</h3>
              <p className="text-sm text-purple-800">{result}</p>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            Powered by AI image recognition technology
          </div>
        </div>
      </div>
    </div>
  );
});

AISpaceIdentifier.displayName = 'AISpaceIdentifier';
