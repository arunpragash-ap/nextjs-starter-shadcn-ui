"use client";
import PrintOutDialog from "@/components/utils/print/PrintOutDialog";
import { useState } from "react";

function MyComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      {/* Button to open the dialog */}
      <button onClick={() => setIsDialogOpen(true)}>
        Open Print Dialog
      </button>

      {/* The PrintOutDialog component */}
      <PrintOutDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        name="John Doe"
        date={new Date()}
      >
        {/* This is the content that will be printed */}
        <div className="print-content">
          <h1>Print Preview</h1>
          <p>This content will appear in the printout.</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>John Doe</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{new Date().toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </PrintOutDialog>
    </div>
  );
}

export default MyComponent;