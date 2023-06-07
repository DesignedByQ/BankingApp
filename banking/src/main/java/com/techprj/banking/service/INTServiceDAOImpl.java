package com.techprj.banking.service;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techprj.banking.dto.AddressDTO;
import com.techprj.banking.dto.AuthUserDTO;
import com.techprj.banking.dto.UserProfileDTO;
import com.techprj.banking.entity.UserProfile;
import com.techprj.banking.repo.UserProfileRepo;

@Service
public class INTServiceDAOImpl implements INTServiceDAO {
	
	@Autowired
	UserProfileRepo userProfileRepo;
	
	@Autowired
	ModelMapper modelMapper;

	@Override
	public UserProfileDTO addUser(UserProfileDTO userProfileDTO) {
//		System.out.println(userProfileDTO.getAddressDTO());
//		System.out.println(userProfileDTO.getAuthUserDTO());
		userProfileDTO.setCustomerSince(LocalDate.now());
		UserProfile up = userProfileRepo.saveAndFlush(modelMapper.map(userProfileDTO, UserProfile.class));
//		System.out.println(up.getAddress());
//		System.out.println(up.getAuthUser());
		System.out.println(up.getCustomerSince());
		AuthUserDTO audto = modelMapper.map(up.getAuthUser(), AuthUserDTO.class);
		AddressDTO adddto = modelMapper.map(up.getAddress(), AddressDTO.class);
		
		UserProfileDTO updto = modelMapper.map(up, UserProfileDTO.class);
		
		updto.setAuthUserDTO(audto);
		updto.setAddressDTO(adddto);
		
//		System.out.println(updto.getAddressDTO());
//		System.out.println(updto.getAuthUserDTO());
		return updto;
		
	}

}

