import React from 'react';

interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: Link[];
    onPageClick: (url: string) => void;
}

export default function Pagination({ links, onPageClick }: PaginationProps) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
                <ul className="pagination mb-0 gap-1">
                    {links.map((link, index) => {
                        if (!link.url && !link.label.includes('Previous') && !link.label.includes('Next')) {
                            // This might happen for "..." in long lists, but we'll show them as disabled
                        }

                        return (
                            <li
                                key={index}
                                className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            >
                                <button
                                    className="page-link shadow-none rounded-3"
                                    onClick={() => link.url && onPageClick(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
