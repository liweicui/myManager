package com.cl.system.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cl.util.BASE64Encoder;
import com.cl.util.Md5;
import com.cl.util.Tools;


@Controller
@RequestMapping(value="/system")
public class LoginActionController implements  ApplicationContextAware{
	
	private Logger logger = Logger.getLogger(LoginActionController.class);
	
	
	private ApplicationContext  applicationContext;
	
	@RequestMapping(value = "/loginJsp.do")
	public String loginJsp(HttpServletRequest request) {
		return "system/login";
	}
	
	@RequestMapping(value = "/login.do")
	public String login(HttpServletRequest  request,HttpServletResponse  response) throws Exception{

		MessageSource msg = (MessageSource) applicationContext.getBean("messageSource");
        Map<Object, Object> errorInfo = new HashMap<Object, Object>();
        if (request.getParameter("empno") == null || request.getParameter("empno").trim().equals("")) {
            errorInfo.put("empno", msg.getMessage("sys.empno.null", null, Locale.CHINA));
        }
        if (request.getParameter("passWord") == null || request.getParameter("passWord").trim().equals("")) {
            errorInfo.put("passWord", msg.getMessage("sys.password.null", null, Locale.CHINA));
        }
        String verify_key = "";
        String code = request.getParameter("code");
        
        Cookie cookies[] = request.getCookies();
        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                Cookie c = cookies[i];
                if (c.getName().equals("VERIFY_KEY")) {
                    verify_key = c.getValue();
                    break;
                }
            }
        }

        String codeResult = this.passCode(code, verify_key);

        if (!"200".equals(codeResult)) {
            errorInfo.put("code", msg.getMessage("sys.code.error", null, Locale.CHINA));
        }
        if (errorInfo.size() > 0) {
        	request.setAttribute("errorInfo", errorInfo);
            return "system/login";
        }
        String empno = request.getParameter("empno").trim();
        String passWord = new Md5().getHexMD5Str(request.getParameter("passWord").trim());

        Map<String,Object> userMap = new HashMap<String,Object>();
       
        userMap.put("userid", "1");
        userMap.put("username", "username");
        
        String userid = (String)userMap.get("userid");
        try {
            if (logger.isInfoEnabled()) {
                logger.info("loginAction");
            }
            if (userid == null || userid.equals("") || userid.equals("null")) {
            	request.setAttribute("message", msg.getMessage("sys.login.error", null, Locale.CHINA));
                return "login/login";
            }
            request.getSession().setAttribute("user", userMap);
            return "index";
        } catch (Exception e) {
            logger.error(e);
            request.setAttribute("bean",  "Oops, error occur...");
            return "error";
        }
    }


	@Override
	public void setApplicationContext(ApplicationContext applicationContext)  throws BeansException {
		   this.applicationContext = applicationContext;
	}

	
    private String passCode(String verifycode, String verify_key) {
        if (!StringUtils.hasLength(verifycode) || verifycode.length() != 4 || !StringUtils.hasLength(verify_key)) {
            return "401";
        }

        long l = Long.parseLong(verify_key, 16);
        long now = System.currentTimeMillis();
        if ((now - l) > 10 * 60 * 1000) {
            return "403";
        }

        StringBuilder yzm = new StringBuilder("");
        BASE64Encoder encode = new BASE64Encoder();
        String encodeStr = encode.encode(verify_key.getBytes());
        for (int i = encodeStr.length() - 1; i >= 0; i--) {
            if (Tools.isNumberOrLetter(encodeStr.charAt(i))) {
                yzm.append(encodeStr.charAt(i));
            }
            if (yzm.length() == 4) {
                break;
            }
        }
        if (yzm.toString().equalsIgnoreCase(verifycode)) {
            return "200";
        } else {
            return "400";
        }

    }
	
}
