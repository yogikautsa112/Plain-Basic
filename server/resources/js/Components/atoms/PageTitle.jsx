import { Link } from "@inertiajs/react";

export default function PageTitle({ title, btnLink, btnTitle, btnHandler, links = [] }) {
    return (
    <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <Link href={route('dashboard.index')}>
                        Dashboard
                        </Link>
                    </li>
                    {links.map((link, index) => {
                        if (link.active) {
                            return <li key={index}>{link.title}</li>
                        }
                        return (
                            <li key={index}>
                                <Link href={link.url}>{link.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        {btnLink && btnLink !== '#'  && btnTitle && (
            <div>
                <Link className="btn btn-primary btn-outline btn-sm" href={btnLink}>{btnTitle}</Link>
            </div>
        )}
        {btnLink === '#' && btnTitle && btnHandler && (
            <div>
                <button className="btn-primary btn btn-outline btn-sm" onClick={btnHandler}>
                    {btnTitle}
                </button>
            </div>
        )}
    </div>
    )
}