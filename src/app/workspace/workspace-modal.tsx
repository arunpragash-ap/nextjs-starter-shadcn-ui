import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export function WorkspaceModal() {

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Create Workspace <span className="text-xs">(Ctrl + W)</span></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-4">
              <Label htmlFor="name-1" className=" col-span-1">Name</Label>
              <Input id="name-1" name="name"  className=" col-span-3" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid grid-cols-4">
              <Label htmlFor="name-1" className=" col-span-1">Description</Label>
              <Input id="name-1" name="name"  className=" col-span-3" defaultValue="Pedro Duarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
