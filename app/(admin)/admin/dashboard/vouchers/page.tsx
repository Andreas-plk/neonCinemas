import { getVouchers,deleteVoucherById,createVoucher} from "@/app/actions";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";


const Page = async () => {
    const vouchers= await getVouchers();




    return (
        <section className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Vouchers</h1>

            <Card className="p-4 mb-8">
                <form action={createVoucher} className="flex flex-col md:flex-row gap-4 items-start">
                    <Input
                        name="code"
                        placeholder="Code (SUMMER2025)"
                        required
                        className="min-w-[200px]"
                    />
                    <Input
                        name="discount"
                        type="number"
                        placeholder="Discount (%)"
                        defaultValue={10}
                        required
                        className="w-32"
                    />
                    <Button variant="outline" className="cursor-pointer" type="submit">Create Voucher</Button>
                </form>
            </Card>

            <Card className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vouchers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3}>No vouchers yet</TableCell>
                            </TableRow>
                        ) : (
                            vouchers.map((v) => (
                                <TableRow key={v.id}>
                                    <TableCell>{v.code}</TableCell>
                                    <TableCell>{v.discount}%</TableCell>
                                    <TableCell className="text-right">
                                        <form action={deleteVoucherById} className="inline-flex justify-end w-full">
                                            <input type="hidden" name="id" value={v.id} />
                                            <Button
                                                variant="destructive"
                                                type="submit"
                                                size="sm"
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <Trash size={14} />
                                                Delete
                                            </Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </section>
    );
}

export default Page
