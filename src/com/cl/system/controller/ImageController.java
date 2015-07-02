package com.cl.system.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cl.util.BASE64Encoder;
import com.cl.util.Tools;



/**
 * 
 * 验证码生成器
 * 
 * @author livi.cui
 *
 */
@Controller
public class ImageController {
	
	@RequestMapping(value="/image.do")
	public void getImage(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		response.setContentType("image/jpeg");
		int width = 80, height = 25;
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics g = image.getGraphics();

		Random random = new Random();
		g.setColor(Tools.getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		g.setFont(new Font("Times New Roman", Font.PLAIN, 22));

		g.setColor(Tools.getRandColor(160, 200));
		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}

		long time = System.currentTimeMillis();
		String stime = Long.toHexString(time);
		Cookie cookie = new Cookie("VERIFY_KEY", stime);
		response.addCookie(cookie);
		BASE64Encoder encode = new BASE64Encoder();
		String encodeStr = encode.encode(stime.getBytes());
		StringBuilder yzm = new StringBuilder("");
		for (int i = encodeStr.length() - 1; i >= 0; i--) {
			if (Tools.isNumberOrLetter(encodeStr.charAt(i))) {
				yzm.append(encodeStr.charAt(i));
			}

			if (yzm.length() == 4) {
				break;
			}
		}
		
		g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
		g.drawString(yzm.toString(), 10, 20);
		g.dispose();

		ImageIO.write(image, "JPEG", response.getOutputStream());
		
		
	}

}
