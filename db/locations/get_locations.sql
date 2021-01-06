SELECT l*, a.username FROM locations l
JOIN adventurers a ON a.id = l.adv_id;