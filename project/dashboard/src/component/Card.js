import React from "react";

const productsData = {
  products: [
    {
      name: "Another Apple Watch",
      image_url:
        "https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg",
      rating: 4,
      price: "$499",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Yet Another Apple Watch",
      image_url:
        "https://images.pexels.com/photos/267315/pexels-photo-267315.jpeg",
      rating: 3,
      price: "$399",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Classic Leather Watch",
      image_url:
        "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg",
      rating: 4,
      price: "$249",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Modern Chrono Watch",
      image_url:
        "https://images.pexels.com/photos/247768/pexels-photo-247768.jpeg",
      rating: 4,
      price: "$299",
      add_to_cart_url: "https://example.com/add-to-cart",
    },

    {
      name: "Fitness Tracker Watch",
      image_url:
        "https://images.pexels.com/photos/692982/pexels-photo-692982.jpeg",
      rating: 4,
      price: "$149",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Digital Smartwatch",
      image_url:
        "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg",
      rating: 4,
      price: "$199",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Retro Pocket Watch",
      image_url:
        "https://images.pexels.com/photos/229590/pexels-photo-229590.jpeg",
      rating: 3,
      price: "$199",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Dive Watch  Band",
      image_url:
        "https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg",
      rating: 5,
      price: "$399",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Luxury Swiss Watch",
      image_url:
        "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg",
      rating: 5,
      price: "$799",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Stylish  Gold Watch",
      image_url:
        "https://images.pexels.com/photos/1627824/pexels-photo-1627824.jpeg",
      rating: 5,
      price: "$399",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Luxury Swiss Watch",
      image_url:
        "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg",
      rating: 5,
      price: "$799",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
    {
      name: "Aviator Pilot Watch",
      image_url:
        "https://images.pexels.com/photos/302929/pexels-photo-302929.jpeg",
      rating: 4,
      price: "$249",
      add_to_cart_url: "https://example.com/add-to-cart",
    },
  ],
};

const ProductCard = ({ product }) => {
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      }
    }
    return stars;
  };
  return (
    <div className="w-full sm:w-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a>
        <img
          src={product.image_url}
          alt="product image"
          className="rounded-t-md w-full h-48 object-cover"
        />
      </a>
      <div className="px-5 pb-5">
        <a>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {renderRatingStars(product.rating)}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.price}
          </span>
          <a className="mt-3 sm:mt-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full sm:w-auto">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-1">
      {productsData.products.map((product, index) => (
        <div key={index}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default Card;
