import React from "react";

type MainImage = {
    listing_image_id: number;
    hex_code: string | null;
    red: number | null;
    green: number | null;
    blue: number | null;
    hue: number | null;
    saturation: number | null;
    brightness: number | null;
    is_black_and_white: boolean | null;
    creation_tsz: number | null;
    listing_id: number;
    rank: number | null;
    url_75x75: string;
    url_170x135: string;
    url_570xN: string;
    url_fullxfull: string;
    full_height: number | null;
    full_width: number | null;
    error_messages?: string;
};

type ListingProps = {
    listing_id: number;
    url?: string;
    MainImage?: MainImage; // Обновляем тип для MainImage
    title?: string;
    currency_code?: string;
    price?: string;
    quantity?: number;
};

type Props = {
    items: ListingProps[];
}



function Listing({ items }: Props) {
    const formatPrice = (price: string, currency: string) => {
        switch (currency) {
            case 'USD':
                return `$${parseFloat(price).toFixed(2)}`;
            case 'EUR':
                return `€${parseFloat(price).toFixed(2)}`;
            default:
                return `${parseFloat(price).toFixed(2)} ${currency}`;
        }
    };

    const getQuantityClass = (quantity: number) => {
        if (quantity <= 10) return 'level-low';
        if (quantity <= 20) return 'level-medium';
        return 'level-high';
    };



    return (
        <div className="item-list">
            {items.map(item => (
                <div className="item" key={item.listing_id}>
                    <div className="item-image">
                        <a href={item.url}>
                            {/* проверка на существование чтобы избежать ошибки 'item.MainImage ' is possibly 'undefined'. */}
                            {item.MainImage ? (<img src={item.MainImage.url_570xN} alt={item.title } /> ) : ''} 
                            {/* <img src={item.MainImage.url_570xN} alt={item.title} /> - это с ошибкой undefined*/}  
                        </a>
                    </div>
                    <div className="item-details">
                        <p className="item-title">
                            {/* добавил item.title &&  <-- таким способом устраняем ошибку что свойство может быть в 'undefined', добавляем доп проверку на существование */}
                            {item.title && item.title.length > 50 ? `${item.title.substring(0, 50)}…` : item.title}
                        
                        </p>
                        {/* || '0' <- таким способом устраняем ошибку что свойство может быть в 'undefined' просто переобреляем его если его не будет */}
                        <p className="item-price"> {formatPrice(item.price || "0", item.currency_code || '0')}</p>
                        <p className={`item-quantity ${getQuantityClass(item.quantity|| 0)}`}>
                            {item.quantity} left
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default Listing;