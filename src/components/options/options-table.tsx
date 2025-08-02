"use client";
import { useEffect, useState } from "react"
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Card, CardContent } from "../ui/card"
import { Switch } from "@/components/ui/switch"
import { Option } from "@/types/options.types"
import OptionsService from "@/services/options/options.service";
import { useCustomToast } from "@/lib/toast-util";
import OptionsTableSkeleton from "./options-table-skeleton";

export default function OptionsTable({ type }: { type: string }) {
    const [rows, setRows] = useState<Option[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<{ rowId: number; field: keyof Option } | null>(null)
    const [editValue, setEditValue] = useState("");
    const toast = useCustomToast();
    // Fetch list on load
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await OptionsService.getByType(type)
                setRows(data)
            } catch (error) {
                console.error("Failed to fetch options:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [type])

    // Update status in backend
    const updateStatus = async (id: number, newStatus: boolean) => {
        try {
            const updatedRow = rows.find((r) => r.id === id)
            if (!updatedRow) return

            const updatedData = { ...updatedRow, status: newStatus }
            await OptionsService.createOrUpdate(updatedData)

            setRows((prev) =>
                prev.map((row) =>
                    row.id === id ? { ...row, status: newStatus } : row
                )
            )
            toast({ title: "Success", description: "Status updated successfully", level: "success" });
        } catch (error) {
            console.error("Failed to update status:", error)
        }
    }

    // Handle double click edit
    const handleDoubleClick = (rowId: number, field: keyof Option, value: string) => {
        setEditing({ rowId, field })
        setEditValue(value)
    }

    // Save edit to backend
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, rowId: number) => {
        if (e.key === "Enter" && editing) {
            try {
                const updatedRow = rows.find((r) => r.id === rowId)
                if (!updatedRow) return

                const updatedData = { ...updatedRow, [editing.field]: editValue.trim() }
                await OptionsService.createOrUpdate(updatedData)

                setRows((prev) =>
                    prev.map((row) =>
                        row.id === rowId ? { ...row, [editing.field]: editValue } : row
                    )
                )
                toast({ title: "Success", description: `${editValue} updated successfully`, level: "success" });
            } catch (error) {
                console.error("Failed to update field:", error)
            } finally {
                setEditing(null)
                setEditValue("")
            }
        }
    }

    if (loading) {
        return (
          <OptionsTableSkeleton/>
        )
    }

    return (
        <Card>
            <CardContent className="p-4">
                <Table className="border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] text-center font-bold">S.No</TableHead>
                            <TableHead className="font-bold w-1/3">Name</TableHead>
                            <TableHead className="font-bold w-1/3">Remarks</TableHead>
                            <TableHead className="text-center font-bold">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell className="text-center">{index + 1}</TableCell>

                                {/* Name */}
                                <TableCell
                                    onDoubleClick={() => handleDoubleClick(row.id, "name", row.name)}
                                    className="cursor-pointer"
                                >
                                    {editing?.rowId === row.id && editing.field === "name" ? (
                                        <input
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, row.id)}
                                            autoFocus
                                            className="p-1 px-2"
                                        />
                                    ) : (
                                        row.name
                                    )}
                                </TableCell>

                                {/* Remarks */}
                                <TableCell
                                    onDoubleClick={() => handleDoubleClick(row.id, "remarks", row.remarks || "")}
                                    className="cursor-pointer"
                                >
                                    {editing?.rowId === row.id && editing.field === "remarks" ? (
                                        <input
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, row.id)}
                                            autoFocus
                                            className="p-1 px-2"
                                        />
                                    ) : (
                                        row.remarks
                                    )}
                                </TableCell>

                                {/* Status */}
                                <TableCell className="text-center">
                                    <Switch
                                        checked={row.status}
                                        onCheckedChange={(checked) => updateStatus(row.id, checked)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Total Records: {rows.length}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    )
}
