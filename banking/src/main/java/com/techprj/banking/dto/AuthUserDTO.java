package com.techprj.banking.dto;

public class AuthUserDTO {
	
	private Integer idAuthUser;
	private String username;
	private String password;
	private Boolean isSuperuser;
	private Boolean isStaff;
	private Long twoFACode;
	
	public AuthUserDTO() {
		super();
	}

	public AuthUserDTO(Integer idAuthUser, String username, String password, Boolean isSuperuser, Boolean isStaff,
			Long twoFACode) {
		super();
		this.idAuthUser = idAuthUser;
		this.username = username;
		this.password = password;
		this.isSuperuser = isSuperuser;
		this.isStaff = isStaff;
		this.twoFACode = twoFACode;
	}

	public Integer getIdAuthUser() {
		return idAuthUser;
	}

	public void setIdAuthUser(Integer idAuthUser) {
		this.idAuthUser = idAuthUser;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getIsSuperuser() {
		return isSuperuser;
	}

	public void setIsSuperuser(Boolean isSuperuser) {
		this.isSuperuser = isSuperuser;
	}

	public Boolean getIsStaff() {
		return isStaff;
	}

	public void setIsStaff(Boolean isStaff) {
		this.isStaff = isStaff;
	}

	public Long getTwoFACode() {
		return twoFACode;
	}

	public void setTwoFACode(Long twoFACode) {
		this.twoFACode = twoFACode;
	}

	@Override
	public String toString() {
		return "AuthUserDTO [idAuthUser=" + idAuthUser + ", username=" + username + ", password=" + password
				+ ", isSuperuser=" + isSuperuser + ", isStaff=" + isStaff + ", twoFACode=" + twoFACode + "]";
	}	

}
