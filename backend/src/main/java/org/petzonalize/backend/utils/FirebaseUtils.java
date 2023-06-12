package org.petzonalize.backend.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.cloud.StorageClient;

@Service
public class FirebaseUtils {
	private static final String FIREBASE_BUCKET = "petzonalize.appspot.com";
	private static final String DOWNLOAD_URL =
		"https://firebasestorage.googleapis.com/v0/b/"+FIREBASE_BUCKET+"/o/%s?alt=media";
	
	private static String uploadFile(File file, String fileName) throws FileNotFoundException, IOException {
		String blobName = "Created/" + fileName;
		BlobId blobId = BlobId.of(FIREBASE_BUCKET, blobName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        
        Credentials credentials = GoogleCredentials.fromStream(
    		new FileInputStream("src/main/resources/firebase-key.json"));
        
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials)
    		.build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }
	
	private static File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }
    
    public static String uploadFileToFirebaseStorage(MultipartFile multipartFile) {
        try {
        	// to get original file name
            String fileName = multipartFile.getOriginalFilename();                        

            // to convert multipartFile to File
            File file = convertToFile(multipartFile, fileName);                      
            
            // to get uploaded file link
            String TEMP_URL = uploadFile(file, fileName);                                   
            
            // to delete the copy of uploaded file stored in the project folder
            file.delete();    
            
            return TEMP_URL;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
	
	public List<String> getImagesFromFirebaseStorage() {
        List<String> imageUrls = new ArrayList<>();

        StorageClient storageClient = StorageClient.getInstance();
        Bucket bucket = storageClient.bucket(FIREBASE_BUCKET);

        // List all the blobs (images) in the bucket
        Iterable<Blob> blobs = bucket.list().iterateAll();

        for (Blob blob : blobs) {
            // Get the URL of each image
            String imageUrl = blob.getMediaLink();
            imageUrls.add(imageUrl);
        }

        return imageUrls;
    }
	
	public String getImageUrlByName(List<String> imageUrls, String imageName) {
	    for (String imageUrl : imageUrls) 
	        if (imageUrl.contains(imageName))
	            return imageUrl;

	    return null;
	}
	
	public String getImageNameFromPath(String imagePath) {
        int lastSlashIndex = imagePath.lastIndexOf("/");
        if (lastSlashIndex != -1 && lastSlashIndex < imagePath.length() - 1) 
            return imagePath.substring(lastSlashIndex + 1);
        else 
            return imagePath;
    }
}
