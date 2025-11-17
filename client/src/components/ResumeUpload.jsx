import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X } from "lucide-react";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      console.log("File uploaded:", selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx"))) {
      handleFileChange(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold" data-testid="text-upload-heading">
          Upload Your Resume
        </h2>
        <p className="text-muted-foreground" data-testid="text-upload-description">
          Upload your resume to get personalized interview questions
        </p>
      </div>

      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid="card-upload-zone"
      >
        <CardContent className="p-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" data-testid="icon-upload" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium" data-testid="text-upload-prompt">
                Drag and drop your resume or click to browse
              </p>
              <Badge variant="secondary" data-testid="badge-accepted-formats">
                PDF, DOCX up to 10MB
              </Badge>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
              data-testid="input-file"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              data-testid="button-browse"
            >
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card data-testid="card-file-preview">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" data-testid="text-file-name">
                    {file.name}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid="text-file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleRemove}
                data-testid="button-remove-file"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {file && (
        <div className="flex justify-center">
          <Button size="lg" data-testid="button-start-interview">
            Start Interview
          </Button>
        </div>
      )}
    </div>
  );
}
