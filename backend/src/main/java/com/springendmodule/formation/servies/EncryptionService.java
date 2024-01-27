package com.springendmodule.formation.servies;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.SecretKeySpec;

@Service
public class EncryptionService {

    @Autowired
    private SecretKeyFactory secretKeyFactory;

    public String encrypt(String data) throws Exception {
        return Base64.encodeBase64String(data.getBytes());
    }
}