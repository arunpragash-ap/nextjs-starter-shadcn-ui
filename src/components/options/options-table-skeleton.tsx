import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const OptionsTableSkeleton = () => {
    return (
          <Card>
                        <CardContent className="p-4">
                            <Table className="border">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[60px]"><div className="h-4 w-8 bg-gray-200 rounded animate-pulse" /></TableHead>
                                        <TableHead><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></TableHead>
                                        <TableHead><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></TableHead>
                                        <TableHead><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[...Array(5)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><div className="h-4 w-4 bg-gray-200 rounded animate-pulse" /></TableCell>
                                            <TableCell><div className="h-4 w-32 bg-gray-200 rounded animate-pulse" /></TableCell>
                                            <TableCell><div className="h-4 w-40 bg-gray-200 rounded animate-pulse" /></TableCell>
                                            <TableCell className="text-center"><div className="h-4 w-8 mx-auto bg-gray-200 rounded animate-pulse" /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
    )

}

export default OptionsTableSkeleton;