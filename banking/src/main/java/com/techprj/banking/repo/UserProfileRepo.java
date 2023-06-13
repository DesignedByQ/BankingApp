package com.techprj.banking.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.techprj.banking.entity.UserProfile;



@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile, Long>{
	
	//@Query("SELECT u FROM users u WHERE u.email = ?1")
	UserProfile findByEmail(String email);

}
