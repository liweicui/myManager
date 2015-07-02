package com.cl.util;

import java.security.MessageDigest;


public class Md5 {

    private static final String KEY = "Men1";

    public String getHexMD5Str(String strIn) throws Exception {
        return getHexMD5Str((KEY + strIn).getBytes());
    }

    public String getHexMD5Str(byte[] arrIn) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] arrB = md.digest(arrIn);
        StringBuilder sb = new StringBuilder(32);
        for (int i = 0; i < arrB.length; i++) {
            int intTmp = arrB[i];
            while (intTmp < 0) {
                intTmp = intTmp + 256;
            }
            if (intTmp < 16) {
                sb.append('0');
            }
            sb.append(Integer.toString(intTmp, 16));
        }
        return sb.toString().toUpperCase();
    }

    public static void main(String[] args) {
        try {
            String strTest = "zb5831128";
            System.out.println(new Md5().getHexMD5Str(strTest));

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

}
