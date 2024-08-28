'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import { ArrowDown, FilterIcon } from 'lucide-react';
import React from 'react';

interface ItemProps {
    id: string;
    label: string;
    selected: boolean;
    setSelectedStage: () => void;
}

const StageItem = ({ id, label, selected, setSelectedStage }: ItemProps) => {
    return (
        <div
            className={`w-full flex items-center justify-center text-white text-4xl cursor-pointer select-none relative rounded-[20px]`}
            data-swapy-item={id}
            onClick={setSelectedStage}
        >
            <Card className='w-full'>
                <CardContent className="p-0 flex items-center gap-4 flex-row">
                    <div className="h-14 w-14 bg-muted flex items-center justify-center rounded-[10px]">
                        <FilterIcon />
                        <ArrowDown
                            size={18}
                            className="absolute -bottom-2 text-primary"
                        />
                    </div>
                    {label}
                </CardContent>
                {selected && <div className="w-2 top-2 right-2 h-2 absolute bg-emerald-500 rounded-full" />}
            </Card >
        </div >
    );
};

export default StageItem;