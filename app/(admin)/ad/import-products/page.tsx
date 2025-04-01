import ImportProductsForm from "@/components/import-products-form";

export default function ImportProducts() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="flex items-center justify-between px-4 lg:px-6">
                        <ImportProductsForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
