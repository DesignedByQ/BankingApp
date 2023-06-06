package com.techprj.banking.dto;

import java.sql.Date;

public class UserProfileDTO {
	
	private Long idUserProfile;
	private AuthUserDTO authUserDTO;
	private String firstName;
	private String middleName;
	private String lastName;
	private Long mobile;
	private String email;
	private AddressDTO address;
	private Date customerSince;
	
	public UserProfileDTO() {
		super();
	}

	public UserProfileDTO(Long idUserProfile, com.techprj.banking.dto.AuthUserDTO authUserDTO, String firstName,
			String middleName, String lastName, Long mobile, String email, AddressDTO address, Date customerSince) {
		super();
		this.idUserProfile = idUserProfile;
		this.authUserDTO = authUserDTO;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.mobile = mobile;
		this.email = email;
		this.address = address;
		this.customerSince = customerSince;
	}

	public Long getIdUserProfile() {
		return idUserProfile;
	}

	public void setIdUserProfile(Long idUserProfile) {
		this.idUserProfile = idUserProfile;
	}

	public AuthUserDTO getAuthUserDTO() {
		return authUserDTO;
	}

	public void setAuthUserDTO(AuthUserDTO authUserDTO) {
		this.authUserDTO = authUserDTO;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getMobile() {
		return mobile;
	}

	public void setMobile(Long mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public AddressDTO getAddress() {
		return address;
	}

	public void setAddress(AddressDTO address) {
		this.address = address;
	}

	public Date getCustomerSince() {
		return customerSince;
	}

	public void setCustomerSince(Date customerSince) {
		this.customerSince = customerSince;
	}

	@Override
	public String toString() {
		return "UserProfileDTO [idUserProfile=" + idUserProfile + ", authUserDTO=" + authUserDTO + ", firstName="
				+ firstName + ", middleName=" + middleName + ", lastName=" + lastName + ", mobile=" + mobile
				+ ", email=" + email + ", address=" + address + ", customerSince=" + customerSince + "]";
	}
	
}
