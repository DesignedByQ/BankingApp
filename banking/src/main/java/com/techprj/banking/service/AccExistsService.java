package com.techprj.banking.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.techprj.banking.entity.UserProfile;
import com.techprj.banking.repo.UserProfileRepo;

@Service
public class AccExistsService {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@Autowired
	UserProfileRepo userProfileRepo;
	
	public boolean checkCredentials(String email, String password) {
		
//		List<UserProfile> up = userProfileRepo.findAll();// .findByEmail(email);
//		
//		UserProfile profile = null;
//		
//		for(UserProfile a: up) {
//	
//			if(a.getEmail().equals(email)) {
//				
//				profile = a;
//				
//			}
//			
//		}
//
//		if(profile != null) {
//			
//			if(profile.getAuthUser().getPassword().equals(password)) {
//				return true;
//			}
//			
//			return false;
//			
//		}
//		
//		return false;

		return jdbcTemplate.queryForObject("select count(*) from users where email=? and id_user_profile in " + "(select id_auth_user from authentication where password=?)", new Object[] {
				email, password
		}, Integer.class) >0;
		
	}

}
