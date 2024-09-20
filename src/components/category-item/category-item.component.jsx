
import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
    const { title, imageUrl, id } = category;
    return (
        <div key={id} className="category-container background-image" style={{
            backgroundImage: `url(${imageUrl})`
        }}>
            '
            <div className="category-body-container">
                <h1>{title}</h1>
                <p>Shop Now</p>
            </div>

        </div>
    );

}

export default CategoryItem;
