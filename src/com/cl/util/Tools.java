package com.cl.util;



import java.awt.Color;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Random;

/**
 * @author Cuiliwei
 * 
 */
public class Tools {

	public static boolean isNumberOrLetter(char a) {
		if ((a >= 48 && a <= 57) || (a >= 97 && a <= 122) || (a >= 65 && a <= 90))
			return true;
		return false;
	}

	// 给定范围获得随机颜色
	public static Color getRandColor(int fc, int bc) {
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	public static String getHTTPRSP(String surl) {
		InputStream in = null;
		try {
			URL url = new URL(surl);
			in = url.openStream();
		} catch (Exception e) {
			return "";
		}
		String str = null;
		StringBuffer sb = new StringBuffer();
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(in, "GBK"));
			while ((str = br.readLine()) != null) {
				sb.append(str + "\n");
			}
			br.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return sb.toString();
	}

}
