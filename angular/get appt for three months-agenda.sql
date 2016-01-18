select a.*, o.account_id, c.salutation, c.firstname, c.lastname, c.surname2, c.cedula, c.identification
            from appointment a
            inner join office o on a.office_id = o.id
            inner join contact c on a.contact_id = c.id
            where a.deleted = 0
            and a.date > adddate(DATE_FORMAT(NOW(),"%Y%m01") , INTERVAL -1 MONTH) 
            and a.date < adddate( DATE_FORMAT(NOW(),"%Y%m01") , INTERVAL 2 MONTH) 
            and o.deleted = 0
            and o.status = 'active'
            and o.account_id in (
                select account_id
                from user_account
                where deleted = 0
                and user_id = 3
            )
            and c.deleted = 0
            order by a.date asc;