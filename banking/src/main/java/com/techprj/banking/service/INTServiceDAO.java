package com.techprj.banking.service;

import java.util.List;

import com.techprj.banking.dto.LoginLogDTO;
import com.techprj.banking.dto.UserProfileDTO;

public interface INTServiceDAO {
	
	UserProfileDTO addUser(UserProfileDTO userProfileDTO);
	
	UserProfileDTO getProfile(String emailid);
	
	LoginLogDTO createLog(String emailid);
	
	List<LoginLogDTO> getLog(String emailid);

}
