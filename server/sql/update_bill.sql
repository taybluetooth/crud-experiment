UPDATE bills 
    SET 
        rent=COALESCE(?, rent), 
        water=COALESCE(?, water), 
        gas=COALESCE(?, gas), 
        electricity=COALESCE(?, electricity), 
        broadband=COALESCE(?, broadband), 
        council_tax=COALESCE(?, council_tax) 
WHERE id=?