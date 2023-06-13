package com.techprj.banking.api;

import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techprj.banking.dto.UserProfileDTO;
import com.techprj.banking.entity.UserProfile;
import com.techprj.banking.service.AccExistsService;
import com.techprj.banking.service.DAOService;
import com.techprj.banking.service.EmailServiceDAOImpl;
import com.techprj.banking.service.INTServiceDAOImpl;

import com.techprj.banking.service.SMSServiceDAOImpl;

@RestController
@RequestMapping("/api")
@Validated
@CrossOrigin
public class ControllerAPI {

	@Autowired
	EmailServiceDAOImpl emailServiceDAOImpl;
	
	@Autowired
	DAOService daoService;
	
	@Autowired
	SMSServiceDAOImpl smsServiceDAOImpl;
	
	@Autowired
	INTServiceDAOImpl intServiceDAOImpl;
	
	@Autowired
	AccExistsService accExistsService;
	
	@PostMapping(value="/adduser", consumes = {MediaType.ALL_VALUE})
	public ResponseEntity<UserProfileDTO> adduser(@RequestBody UserProfileDTO userProfileDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(intServiceDAOImpl.addUser(userProfileDTO));
				
	}
	
	@PutMapping(value="/emails/{emailid}/password/{password}/2fa", consumes={MediaType.ALL_VALUE})
	public ResponseEntity<Object> send2faCodeinEmail(@PathVariable("emailid") String emailid, @PathVariable("password") String password) throws AddressException, MessagingException {
		
		//validate the account exists
		boolean accExists = accExistsService.checkCredentials(emailid, password);
		
		//System.out.println(accExists);
		
		if(accExists) {
			String twoFaCode = String.valueOf(new Random().nextInt(9999)+1000);
			emailServiceDAOImpl.sendEmail(emailid, twoFaCode);
			daoService.update2FAProperties(emailid, twoFaCode);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		
	}
	
	@PutMapping(value="/users/{userid}/mobilenumbers/{mobilenumber}/2fa", consumes={MediaType.ALL_VALUE})
	public ResponseEntity<Object> send2faCodeinSMS(@PathVariable("userid") String userid, @PathVariable("mobilenumber") String mobilenumber){
		
		String twoFaCode = String.valueOf(new Random().nextInt(9999)+1000);
		smsServiceDAOImpl.send2FaCode(mobilenumber, twoFaCode);
		daoService.update2FAProperties(userid, twoFaCode);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping(value="/users/{userid}/codes/{twofacode}", consumes={MediaType.ALL_VALUE})
	public ResponseEntity<Object> verify(@PathVariable("userid") String userid, @PathVariable("twofacode") String code){
		
		boolean isValid = daoService.checkCode(userid, code);
		
		if(isValid)
			return new ResponseEntity<>(HttpStatus.OK);
		
		return new ResponseEntity<>(HttpStatus.FORBIDDEN);	
		
	}
	
}
