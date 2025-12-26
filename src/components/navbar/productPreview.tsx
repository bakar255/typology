import React from 'react';
import Link from 'next/link';

interface ProductItem {
    name: string;
    slug: string;
}

interface ProductPreviewProps {
    title: string;
    items: ProductItem[];
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({ title, items }) => {
    return (
        <div className="w-[300px] xl:w-[400px] p-6 bg-white/50 border-l border-gray-100 flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Selected For You</span>
                <h3 className="text-xl font-light text-gray-900">{title}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {items.slice(0, 4).map((item) => (
                    <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className="group flex flex-col gap-2 p-2 rounded-sm hover:bg-gray-50 transition-colors"
                    >
                        {/* Placeholder for Product Image */}
                        <div className="aspect-[3/4] w-full bg-neutral-100 group-hover:bg-neutral-200 transition-colors relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                View
                            </div>
                        </div>
                        <span className="text-xs text-gray-700 font-medium group-hover:text-black transition-colors">{item.name}</span>
                    </Link>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
                <Link href={`/${items[0]?.slug || '#'}`} className="text-xs uppercase tracking-widest border-b border-black pb-0.5 hover:border-transparent transition-all">
                    Shop All {title}
                </Link>
            </div>
        </div>
    );
};
