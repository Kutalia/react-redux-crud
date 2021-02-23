import ProductComponent from './components/ProductComponent';

const ProductsContainer = ({ products, removeProduct, editProduct }) => {
    const productRows = [];

    products.forEach((product, index) => {
        const Product = <div className="col-sm-4 mt-4" key={product.id}>
            <ProductComponent product={product} removeProduct={() => removeProduct(product.id)} editProduct={editProduct} />
        </div>;
        if (index % 3 === 0) {
            productRows.push([Product]);
        } else {
            productRows[productRows.length - 1].push(Product);
        }
    });

    // to make sure rows are unique
    const getRowChecksum = rowIndex => {
        let checksum = '';

        new Array(3).fill(null).forEach((val, columnIndex, arr) => {
            const product = products[rowIndex * arr.length + columnIndex];

            if (product) {
                checksum += product.id;
            }
        });

        return checksum;
    }

    return (
        productRows.map((row, index) =>
            <div className="row mt-3" key={getRowChecksum(index)}>
                {row}
            </div>
        )
    );
};

export default ProductsContainer;
