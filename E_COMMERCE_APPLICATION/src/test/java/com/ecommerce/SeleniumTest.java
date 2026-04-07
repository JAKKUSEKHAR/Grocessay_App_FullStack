package com.ecommerce;
 

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class SeleniumTest {

    @Test
    public void testFormSubmission() throws InterruptedException {

        // Setup driver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        // Open your Spring Boot app
        driver.get("http://localhost:8080");

        // Maximize window
        driver.manage().window().maximize();

        // ---- Example: Fill Form ----
        WebElement nameField = driver.findElement(By.id("name"));
        nameField.sendKeys("Sekhar");

        WebElement emailField = driver.findElement(By.id("email"));
        emailField.sendKeys("sekhar@test.com");

        WebElement submitBtn = driver.findElement(By.id("submit"));
        submitBtn.click();

        // Wait (simple way)
        Thread.sleep(2000);

        // ---- Verify something ----
        String pageSource = driver.getPageSource();
        if (pageSource.contains("Success")) {
            System.out.println("Test Passed ✅");
        } else {
            System.out.println("Test Failed ❌");
        }

        // Close browser
        driver.quit();
    }
}