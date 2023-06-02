import { Link } from 'react-router-dom'
import type { FC } from 'react'

const index: FC = () => {
    return (
        <div>
            <p>index.vue</p>
            <Link to="/demo">
                demo
            </Link> |
            <Link to="/blog">
                blog
            </Link> |
            <Link to="/components">
                components
            </Link> |
            <Link to="/xxx">
                not exists
            </Link>
        </div>
    )
}

export default index