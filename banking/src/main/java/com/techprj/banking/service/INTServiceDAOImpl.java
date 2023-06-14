package com.techprj.banking.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.techprj.banking.dto.AddressDTO;
import com.techprj.banking.dto.AuthUserDTO;
import com.techprj.banking.dto.LoginLogDTO;
import com.techprj.banking.dto.UserProfileDTO;
import com.techprj.banking.entity.LoginLog;
import com.techprj.banking.entity.UserProfile;
import com.techprj.banking.repo.LoginLogRepo;
import com.techprj.banking.repo.UserProfileRepo;

@Service
public class INTServiceDAOImpl implements INTServiceDAO {
	
	@Autowired
	UserProfileRepo userProfileRepo;
	
	@Autowired
	LoginLogRepo loginLogRepo;
	
	@Autowired
	ModelMapper modelMapper;

	@Override
	public UserProfileDTO addUser(UserProfileDTO userProfileDTO) {

		userProfileDTO.setCustomerSince(LocalDate.now());
		
		UserProfile up = userProfileRepo.saveAndFlush(modelMapper.map(userProfileDTO, UserProfile.class));

		//System.out.println(up.getCustomerSince());
		AuthUserDTO audto = modelMapper.map(up.getAuthUser(), AuthUserDTO.class);
		AddressDTO adddto = modelMapper.map(up.getAddress(), AddressDTO.class);
		
		UserProfileDTO updto = modelMapper.map(up, UserProfileDTO.class);
		
		updto.setAuthUserDTO(audto);
		updto.setAddressDTO(adddto);
		
		return updto;
		
	}

	@Override
	public UserProfileDTO getProfile(String emailid) {

		UserProfile up = userProfileRepo.findByEmail(emailid);
		//System.out.println(up.getAuthUser().getTwoFACodeExpiryTime());
		AuthUserDTO audto = modelMapper.map(up.getAuthUser(), AuthUserDTO.class);
		AddressDTO adddto = modelMapper.map(up.getAddress(), AddressDTO.class);
		
		UserProfileDTO updto = modelMapper.map(up, UserProfileDTO.class);
		
		updto.setAuthUserDTO(audto);
		updto.setAddressDTO(adddto);
		
		return updto;
	}

	@Override
	public LoginLogDTO createLog(String emailid) {
		
		UserProfileDTO updto = getProfile(emailid);
		
		//set user profile
		LoginLogDTO lldto = new LoginLogDTO();
		lldto.setUserProfileDTO(updto);
		
		//set IP address
		try {
			InetAddress localhost = InetAddress.getLocalHost();
			lldto.setiP(localhost.getHostAddress());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		
		//set location
		try {
            URL url = new URL("https://ipapi.co/json/");
            BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));

            String line;
            StringBuilder response = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            reader.close();
            
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.toString());
            String city = jsonNode.get("city").asText();
          
            lldto.setLocation(city);
            //System.out.println(response.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
		
		//set date and time
		lldto.setEventTime(LocalDateTime.now());
		
		System.out.println(".............................");

		//System.out.println(lldto.getUserProfileDTO());
		
		LoginLog lolo = loginLogRepo.saveAndFlush(modelMapper.map(lldto, LoginLog.class));
		
		//System.out.println(lolo.getUserProfile());
				
		LoginLogDTO lolodto = modelMapper.map(lolo, LoginLogDTO.class);
		
		lolodto.setUserProfileDTO(updto);
		
		System.out.println(lolodto);
		
		return lolodto;
	}

	@Override
	public List<LoginLogDTO> getLog(String emailid) {
		
		UserProfile up = userProfileRepo.findByEmail(emailid);
		
		Long id = up.getIdUserProfile();
		
		List<LoginLog> lolol = loginLogRepo.findAll();
		//System.out.println(lolol.size());
		List<LoginLogDTO> llldto = new ArrayList();
		
		for(LoginLog a: lolol) {
			
			if(a.getUserProfile().getIdUserProfile() == id) {
				
				LoginLogDTO newA = modelMapper.map(a, LoginLogDTO.class);
				
				AuthUserDTO audto = modelMapper.map(up.getAuthUser(), AuthUserDTO.class);
				AddressDTO adddto = modelMapper.map(up.getAddress(), AddressDTO.class);
				
				UserProfileDTO updto = modelMapper.map(up, UserProfileDTO.class);
				
				updto.setAuthUserDTO(audto);
				updto.setAddressDTO(adddto);
				
				newA.setUserProfileDTO(updto);
				
				llldto.add(newA);
				
			}
			
		}
		
		return llldto;
		
	}

}

