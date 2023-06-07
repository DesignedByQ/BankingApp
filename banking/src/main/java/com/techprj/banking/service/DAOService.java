package com.techprj.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DAOService {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	public void update2FAProperties(String userid, String twofacode) {
		
		jdbcTemplate.update("update authentication set twofacode=?, twofacodeexpirytime=? where id_auth_user=?", new Object[] {
				
				twofacode, (System.currentTimeMillis()/1000) + 120L, userid
				
		});
		
	}

}
