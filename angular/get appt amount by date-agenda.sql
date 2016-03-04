select DATE_FORMAT(date, '%m-%d-%Y') as date,count(1) as count
            from appointment a
            inner join contact c on a.contact_id = c.id
            inner join office o on a.office_id = o.id
            where a.deleted = 0
            and o.deleted = 0
            and c.deleted = 0
            and o.status = 'active'
            and o.account_id in (
                select account_id
                from user_account
                where deleted = 0
                and account_id = 1
                and user_id = 3
            )
            and date > adddate( "20160118" , INTERVAL 2-DAYOFWEEK("20160118") DAY) 
            and date < adddate( "20160118" , INTERVAL 8-DAYOFWEEK("20160118") DAY) 
            GROUP BY DATE_FORMAT(date, '%m-%d-%Y')
            order by a.date asc;