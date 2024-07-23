import React from 'react'

interface IWidgetItemsProps {
    items: any;
    ItemComponent: any;
    writeChanges: any;
    deleteItem: any;
    selectedTemplate: any;

}

export const WidgetItems = ({ items, ItemComponent, writeChanges, deleteItem, selectedTemplate }: IWidgetItemsProps) => {
    return (
        <section className="max-h-[460px] flex flex-col gap-10 overflow-y-scroll w-full  rounded-md border p-4 ">
            {Object.keys(items).map((key, idx) => (
                <ItemComponent
                    writeChanges={writeChanges}
                    card={items[key]}
                    deleteCard={() => deleteItem(key)}
                    key={idx}
                    id={key}
                    templateWidgets={
                        selectedTemplate ? selectedTemplate.widgets : undefined
                    }
                />
            ))}
        </section>
    )
}
