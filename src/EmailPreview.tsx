interface EmailPreviewProps {
  emailPreview: any;
  onClose: () => void;
}

export function EmailPreview({ emailPreview, onClose }: EmailPreviewProps) {
  if (!emailPreview) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>👀</span>
        Email Preview
        <button
          onClick={onClose}
          className="ml-auto text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>
      </h2>
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">To: {emailPreview.email}</span>
        </div>
        
        {emailPreview.mjmlData?.html && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 text-sm font-medium">
              Compiled HTML Email
            </div>
            <div 
              className="p-4 max-h-96 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: emailPreview.mjmlData.html }}
            />
          </div>
        )}
        
        {emailPreview.mjmlData?.mjml && (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 text-sm font-medium">
              MJML Source
            </div>
            <pre className="p-4 text-xs bg-gray-50 overflow-x-auto max-h-64 overflow-y-auto">
              {emailPreview.mjmlData.mjml}
            </pre>
          </div>
        )}
        
        {emailPreview.mjmlData?.errors && emailPreview.mjmlData.errors.length > 0 && (
          <div className="border border-red-200 rounded-lg overflow-hidden">
            <div className="bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
              MJML Compilation Errors
            </div>
            <div className="p-4 text-sm text-red-600">
              {emailPreview.mjmlData.errors.map((error: any, index: number) => (
                <div key={index} className="mb-2">
                  {error.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
