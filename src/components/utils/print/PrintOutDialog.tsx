import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PrintOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  name?: string
  date?: Date
  children: React.ReactNode
}

const PrintOutDialog: React.FC<PrintOutDialogProps> = ({ open, onOpenChange, name = "User", date, children }) => {
  const printRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  

  // Helper to ensure we always have a valid date
  const getValidDate = (d?: Date) => {
    if (d instanceof Date && !isNaN(d.getTime())) return d
    return new Date()
  }

  const formatDate = (d?: Date) => getValidDate(d).toLocaleDateString("en-GB")

  // Modern PDF generation using browser's native printing capabilities
  const generatePdfWithNativePrint = async () => {
    const el = printRef.current
    if (!el) throw new Error("Content not found")

    // Create a new window with the content
    const printWindow = window.open("", "_blank", "width=800,height=600")
    if (!printWindow) throw new Error("Failed to open print window")

    // Enhanced CSS with OKLCH color support
    const printStyles = `
      <style>
        @media print {
          body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif;  font-family: 'Noto Sans Tamil', 'Latha', sans-serif;  }
          .print-content { max-width: 100%; }
          .no-print { display: none !important; }
          /* OKLCH color examples - these will render properly in modern browsers */
          .oklch-primary { color: oklch(0.7 0.15 200); }
          .oklch-secondary { color: oklch(0.5 0.1 300); }
          .oklch-accent { background-color: oklch(0.9 0.05 180); }
          /* Table styles with OKLCH colors */
          table { border-collapse: collapse; width: 100%; margin: 20px 0; }
          th, td { border: 1px solid oklch(0.8 0.02 240); padding: 8px; text-align: left; }
          th { background-color: oklch(0.95 0.03 220); font-weight: 600; }
          /* Header styling with OKLCH */
          .header-section {
            border-bottom: 2px solid oklch(0.3 0.1 240);
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .footer-section {
            border-top: 1px solid oklch(0.7 0.05 240);
            padding-top: 16px;
            margin-top: 24px;
            text-align: center;
            color: oklch(0.6 0.05 240);
          }
        }
        @media screen {
          body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; }
          .print-content { max-width: 800px; margin: 0 auto; }
        }
      </style>
    `

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Printout - ${name}</title>
          ${printStyles}
        </head>
        <body>
          <div class="print-content">
            ${el.innerHTML}
          </div>
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Wait for content to load
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return printWindow
  }

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      // Use browser's native print-to-PDF functionality
      const printWindow = await generatePdfWithNativePrint()
      printWindow.print()
      setTimeout(() => printWindow.close(), 1000)
    } catch (e) {
      console.error(e)
      alert("Download failed. Please use the print dialog to save as PDF.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShare = async () => {
    setIsGenerating(true)
    try {
      const el = printRef.current
      if (!el) throw new Error("Content not found")

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Printout - ${name}</title>
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
              table { border-collapse: collapse; width: 100%; margin: 20px 0; }
              th, td { border: 1px solid oklch(0.8 0.02 240); padding: 8px; text-align: left; }
              th { background-color: oklch(0.95 0.03 220); font-weight: 600; }
              .header-section { border-bottom: 2px solid oklch(0.3 0.1 240); padding-bottom: 16px; margin-bottom: 24px; }
              .footer-section { border-top: 1px solid oklch(0.7 0.05 240); padding-top: 16px; margin-top: 24px; text-align: center; color: oklch(0.6 0.05 240); }
            </style>
          </head>
          <body>
            ${el.innerHTML}
          </body>
        </html>
      `

      const blob = new Blob([htmlContent], { type: "text/html" })
      const file = new File([blob], `printout_${name}_${formatDate(date).replace(/\//g, "-")}.html`, {
        type: "text/html",
      })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Printout HTML",
          text: `Printout for ${name}`,
          files: [file],
        })
      } else {
        // Fallback: download the HTML file
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = file.name
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (e) {
      console.error(e)
      alert("Share failed. Please ensure all fields are filled and try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full">
      {/* Hidden print content - needed for PDF generation but not displayed */}
      <div className="hidden w-full">
        <div ref={printRef} className="w-full">
          {children}
        </div>
      </div>
      {/* Action dialog */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What would you like to do?</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-2">
            <Button onClick={handleDownload} disabled={isGenerating} size="sm">
              Print PDF
            </Button>
            <Button onClick={handleShare} disabled={isGenerating} size="sm">
              Share
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PrintOutDialog 