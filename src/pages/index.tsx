import { Link } from 'react-router-dom'
import type { FC } from 'react'

const index: FC = () => {
    return (
        <div>
            <p style={{ fontSize: 20, marginBottom: 15 }}>index.vue</p>
            <Link to="/demo">
                demo
            </Link>
            <br />
            <Link to="/blog">
                blog
            </Link>
            <br />
            <Link to="/components">
                components
            </Link>
            <br />
            <Link to="/xxx">
                not exists
            </Link>
        </div>
    )
}

export default index