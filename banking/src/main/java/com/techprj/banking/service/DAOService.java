package com.techprj.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.RowMapper;

@Repository
public class DAOService {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	public void update2FAProperties(String emailid, String twofacode) {
		
		jdbcTemplate.update("update authentication set twofacode=?, twofacodeexpirytime=? " + "where id_auth_user in (select id_user_profile from users where email=?)", new Object[] {
				
				twofacode, (System.currentTimeMillis()/1000) + 12000L, emailid
				
		});
		
	}

	@SuppressWarnings("deprecation")
	public boolean checkCode(String emailid, String code) {

		return jdbcTemplate.queryForObject("select count(*) from authentication where twofacode=? and twofacodeexpirytime >=? and id_auth_user in (select id_user_profile from users where email=?)", new Object[] {
				code, System.currentTimeMillis()/1000, emailid
		}, Integer.class) >0;
		
	}
	
//	//In this updated code, the query method is used to execute the SQL query and retrieve the result. The result is mapped to an Integer using a lambda expression (rs, rowNum) -> rs.getInt(1). We then use findFirst().orElse(0) to get the first result (if any) and handle the case where no results are returned.
//	public boolean checkCode(String userid, String code) {
//	    Integer count = jdbcTemplate.query(
//	        "select count(*) from authentication where twofacode=? and id_auth_user=?",
//	        new Object[]{code, userid},
//	        (rs, rowNum) -> rs.getInt(1)
//	    ).findFirst().orElse(0);
//	    
//	    return count > 0;
//	}

	


}
