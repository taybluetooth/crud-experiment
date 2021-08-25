UPDATE products 
    SET 
        name=COALESCE(?, name), 
        price=COALESCE(?, price), 
        type=COALESCE(?, type), 
        image=COALESCE(?, image), 
WHERE id=?