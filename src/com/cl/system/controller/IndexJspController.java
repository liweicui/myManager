package com.cl.system.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 
 * 首页导航
 * 
 * @author livi.cui
 *
 */
@Controller
@RequestMapping(value="/index")
public class IndexJspController {
	
	
	private Logger logger = Logger.getLogger(IndexJspController.class);
	
    /**
     * 首页TOP
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
	@RequestMapping(value="/topFrame.do")
    public String topFrame(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "top";
    }
	
	
    /**
     * 首页左边菜单区域
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
	@RequestMapping(value="/leftFrame.do")
    public String leftFrame(HttpServletRequest request, HttpServletResponse response) throws Exception {
       
        try {
        	request.setAttribute("str", "helloWord");
            return "left";
        } catch (Exception e) {
            logger.error(e);
            request.setAttribute("error_view", "Oops, error occur...");
            return "error";
        }
    }

    
	
	   /**
     * 首页的框架的一部分
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
	@RequestMapping(value="/lineFrame.do")
    public String lineFrame(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "line";
    }

	

}
