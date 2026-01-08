import React from 'react';

export default function Pagination({ links, onPageClick }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
                <ul className="pagination mb-0">
                    {links.map((link, index) => {
                        if (!link.url && !link.label.includes('Previous') && !link.label.includes('Next')) {
                            return null;
                        }

                        return (
                            <li
                                key={index}
                                className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                            >
                                <button
                                    className="page-link shadow-none"
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
