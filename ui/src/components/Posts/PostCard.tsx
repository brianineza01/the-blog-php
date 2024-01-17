import { Link } from "@tanstack/react-router";

const PostCard = ({
    img,
    title,
    slug,
    createdAt,
}: {
    img: string;
    title: string;
    slug: string;
    createdAt: string;
}) => {
    return (
        <Link to="/posts/$slug" params={{ slug }}>
            <div>
                <img src={img} alt={`img-${title}`} />
                <h1>{title}</h1>
                <p>{createdAt}</p>
            </div>
        </Link>
    );
};

export default PostCard;
