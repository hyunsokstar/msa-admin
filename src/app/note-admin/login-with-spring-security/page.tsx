"use client";
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Check, Copy, Code, Database, Shield, Key, Server, User, Mail, Lock } from 'lucide-react';

const SpringSecurityJWTGuide = () => {
    interface ExpandedSections {
        [key: string]: boolean;
    }

    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});

    const toggleSection = (sectionId: string): void => {
        setExpandedSections((prev: ExpandedSections) => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const CodeBlock = ({ children, title }: { children: React.ReactNode; title?: string }) => (
        <div className="bg-gray-900 rounded-lg overflow-hidden my-4">
            {title && (
                <div className="bg-gray-800 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                    {title}
                </div>
            )}
            <div className="p-4">
                <pre className="text-sm text-gray-100 overflow-x-auto">
                    <code>{children}</code>
                </pre>
            </div>
        </div>
    );

    const Step = ({ icon: Icon, title, description, children, stepNumber, sectionId }: {
        icon: React.ComponentType<{ className?: string; size?: string | number }>;
        title: string;
        description: string;
        children: React.ReactNode;
        stepNumber: number;
        sectionId: string;
    }) => (
        <div className="border border-gray-200 rounded-lg mb-6 overflow-hidden">
            <div
                className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleSection(sectionId)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">{stepNumber}</span>
                        </div>
                        <Icon className="text-blue-600" size={20} />
                        <div>
                            <h3 className="font-semibold text-gray-800">{title}</h3>
                            <p className="text-sm text-gray-600">{description}</p>
                        </div>
                    </div>
                    {expandedSections[sectionId] ?
                        <ChevronDown className="text-gray-400" size={20} /> :
                        <ChevronRight className="text-gray-400" size={20} />
                    }
                </div>
            </div>
            {expandedSections[sectionId] && (
                <div className="p-6 bg-white border-t border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* 헤더 */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Shield className="text-blue-600" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    스프링 시큐리티 JWT 로그인 구현 가이드
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    JWT 토큰 기반 이메일 로그인 시스템 핵심 구현 방법
                </p>
            </div>

            {/* 개요 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-blue-800 mb-3">핵심 구현 사항</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium text-blue-700 mb-2">주요 기능</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                            <li>• JWT 토큰 기반 Stateless 인증</li>
                            <li>• 이메일 로그인 (username 대신)</li>
                            <li>• BCrypt 비밀번호 암호화</li>
                            <li>• Authorization 헤더 검증</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-blue-700 mb-2">구현 포인트</h4>
                        <ul className="text-sm text-blue-600 space-y-1">
                            <li>• JwtUtil: 토큰 생성/검증</li>
                            <li>• JwtAuthenticationFilter: 토큰 필터</li>
                            <li>• SecurityConfig: 보안 설정</li>
                            <li>• 이메일 기반 로그인 API</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 단계별 구현 */}
            <div className="space-y-6">

                {/* 1. JWT 의존성 및 설정 */}
                <Step
                    icon={Key}
                    title="JWT 시스템 설정"
                    description="JWT 라이브러리 추가 및 기본 설정"
                    stepNumber={1}
                    sectionId="jwt-setup"
                >
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Gradle 의존성 추가</h4>
                        <CodeBlock title="build.gradle.kts">
                            {`dependencies {
    // 기존 의존성들...
    
    // JWT
    implementation("io.jsonwebtoken:jjwt-api:0.12.3")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.3")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.3")
    
    // Lombok (선택사항)
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
}`}
                        </CodeBlock>

                        <h4 className="font-semibold text-gray-800">JWT 설정</h4>
                        <CodeBlock title="application.yml">
                            {`app:
  jwt:
    secret: "mySecretKey123456789012345678901234567890123456789012345678901234567890"
    expiration: 86400000 # 24시간 (밀리초)`}
                        </CodeBlock>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                                <strong>주의:</strong> 운영환경에서는 환경변수로 secret을 관리하세요.
                            </p>
                        </div>
                    </div>
                </Step>

                {/* 2. JWT 유틸리티 클래스 */}
                <Step
                    icon={Code}
                    title="JWT 유틸리티 클래스"
                    description="토큰 생성, 검증, 정보 추출 기능 구현"
                    stepNumber={2}
                    sectionId="jwt-util"
                >
                    <div className="space-y-4">
                        <CodeBlock title="src/main/java/com/company/dotaadminbackend/config/JwtUtil.java">
                            {`package com.company.dotaadminbackend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    
    @Value("\${app.jwt.secret}")
    private String secretKey;
    
    @Value("\${app.jwt.expiration}")
    private Long expiration;
    
    /**
     * JWT 토큰 생성
     */
    public String generateToken(String email, String role) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        
        return Jwts.builder()
                .setSubject(email)                    // 사용자 식별자 (이메일)
                .claim("role", role)                  // 사용자 역할
                .setIssuedAt(new Date())              // 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)                        // 서명
                .compact();
    }
    
    /**
     * 토큰에서 이메일 추출
     */
    public String getEmailFromToken(String token) {
        return getClaims(token).getSubject();
    }
    
    /**
     * 토큰에서 역할 추출
     */
    public String getRoleFromToken(String token) {
        return getClaims(token).get("role", String.class);
    }
    
    /**
     * 토큰 유효성 검증
     */
    public boolean isTokenValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
    
    /**
     * 토큰에서 Claims 정보 추출
     */
    private Claims getClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}`}
                        </CodeBlock>
                    </div>
                </Step>

                {/* 3. 이메일 로그인 API */}
                <Step
                    icon={Mail}
                    title="이메일 로그인 API"
                    description="이메일 기반 로그인 및 JWT 토큰 발급"
                    stepNumber={3}
                    sectionId="login-api"
                >
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">UserController - 로그인 엔드포인트</h4>
                        <CodeBlock title="src/main/java/com/company/dotaadminbackend/web/UserController.java">
                            {`@RestController
@RequestMapping("/api/auth")
public class UserController {
    
    private final UserService userService;
    private final JwtUtil jwtUtil;
    
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }
    
    /**
     * 이메일 로그인
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // 이메일로 사용자 조회
        Optional<User> userOpt = userService.findByEmail(request.email());
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Invalid credentials"));
        }
        
        User user = userOpt.get();
        
        // 비밀번호 검증
        if (!userService.validatePassword(request.password(), user.getPassword())) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "Invalid credentials"));
        }
        
        // JWT 토큰 생성
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        
        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "token", token,                    // 🔑 프론트엔드에서 저장할 JWT 토큰
            "userId", user.getId(),
            "username", user.getUsername(),
            "email", user.getEmail(),
            "role", user.getRole()
        ));
    }
    
    /**
     * 회원가입
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(
                request.username(), 
                request.password(), 
                request.email()
            );
            
            return ResponseEntity.ok(Map.of(
                "message", "User registered successfully",
                "userId", user.getId(),
                "username", user.getUsername()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", e.getMessage()));
        }
    }
    
    // DTO Records
    public record RegisterRequest(String username, String password, String email) {}
    public record LoginRequest(String email, String password) {}  // 이메일로 로그인
}`}
                        </CodeBlock>

                        <h4 className="font-semibold text-gray-800">UserService - 핵심 메서드</h4>
                        <CodeBlock title="UserService.java">
                            {`@Service
public class UserService {
    
    private final SpringDataUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    
    /**
     * 이메일로 사용자 조회
     */
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email).map(this::convertToUser);
    }
    
    /**
     * 비밀번호 검증
     */
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    
    /**
     * 회원가입
     */
    public User registerUser(String username, String password, String email) {
        if (repository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(username);
        userEntity.setPassword(passwordEncoder.encode(password));  // BCrypt 암호화
        userEntity.setEmail(email);
        userEntity.setRole("USER");
        
        UserEntity saved = repository.save(userEntity);
        return convertToUser(saved);
    }
    
    private User convertToUser(UserEntity entity) {
        return new User(entity.getId(), entity.getUsername(), 
                       entity.getPassword(), entity.getEmail(), entity.getRole());
    }
}`}
                        </CodeBlock>
                    </div>
                </Step>

                {/* 4. JWT 인증 필터 */}
                <Step
                    icon={Shield}
                    title="JWT 인증 필터"
                    description="Authorization 헤더에서 JWT 토큰 검증 및 인증 처리"
                    stepNumber={4}
                    sectionId="jwt-filter"
                >
                    <div className="space-y-4">
                        <CodeBlock title="src/main/java/com/company/dotaadminbackend/config/JwtAuthenticationFilter.java">
                            {`package com.company.dotaadminbackend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtUtil jwtUtil;
    
    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        // Authorization 헤더에서 토큰 추출
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);  // "Bearer " 제거
            
            // 토큰 유효성 검증
            if (jwtUtil.isTokenValid(token)) {
                String email = jwtUtil.getEmailFromToken(token);
                String role = jwtUtil.getRoleFromToken(token);
                
                // Spring Security 인증 객체 생성
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(
                        email,                                                    // principal
                        null,                                                     // credentials (비밀번호는 불필요)
                        List.of(new SimpleGrantedAuthority("ROLE_" + role))      // authorities
                    );
                
                // SecurityContext에 인증 정보 설정
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        
        // 다음 필터로 진행
        filterChain.doFilter(request, response);
    }
}`}
                        </CodeBlock>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-medium text-blue-800 mb-2">필터 동작 원리</h4>
                            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                                <li>모든 HTTP 요청을 가로채서 Authorization 헤더 확인</li>
                                <li>"Bearer &#123;token&#125;" 형태의 헤더에서 JWT 토큰 추출</li>
                                <li>JwtUtil을 통해 토큰 유효성 검증</li>
                                <li>유효한 토큰이면 SecurityContext에 인증 정보 설정</li>
                                <li>이후 @PreAuthorize, @Secured 등의 인증/인가 기능 사용 가능</li>
                            </ol>
                        </div>
                    </div>
                </Step>

                {/* 5. 스프링 시큐리티 설정 */}
                <Step
                    icon={Lock}
                    title="스프링 시큐리티 설정"
                    description="JWT 기반 Stateless 보안 설정 및 엔드포인트 보호"
                    stepNumber={5}
                    sectionId="security-config"
                >
                    <div className="space-y-4">
                        <CodeBlock title="src/main/java/com/company/dotaadminbackend/config/SecurityConfig.java">
                            {`package com.company.dotaadminbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CSRF 비활성화 (JWT 사용 시 불필요)
            .csrf(csrf -> csrf.disable())
            
            // CORS 설정 활성화
            .cors(Customizer.withDefaults())
            
            // 세션 비활성화 (Stateless)
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // 엔드포인트별 접근 권한 설정
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()           // 인증 API는 모두 허용
                .requestMatchers("/api/players/hello").permitAll()     // Hello API 허용
                .anyRequest().authenticated()                          // 나머지는 인증 필요
            )
            
            // JWT 필터를 UsernamePasswordAuthenticationFilter 앞에 추가
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
            
        return http.build();
    }
    
    /**
     * 비밀번호 암호화 Bean
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    /**
     * CORS 설정 (Next.js 연동용)
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}`}
                        </CodeBlock>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-medium text-green-800 mb-2">핵심 설정 포인트</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                                <li><strong>Stateless:</strong> 세션을 사용하지 않고 JWT 토큰으로만 인증</li>
                                <li><strong>CSRF 비활성화:</strong> REST API에서는 불필요</li>
                                <li><strong>필터 순서:</strong> JWT 필터를 기본 인증 필터보다 먼저 실행</li>
                                <li><strong>CORS 허용:</strong> Next.js 등 프론트엔드와 통신을 위해 필요</li>
                            </ul>
                        </div>
                    </div>
                </Step>

                {/* 6. 테스트 및 사용법 */}
                <Step
                    icon={Server}
                    title="API 테스트 및 사용법"
                    description="Postman 테스트 및 Next.js 연동 방법"
                    stepNumber={6}
                    sectionId="testing"
                >
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">1. 로그인 테스트</h4>
                        <CodeBlock title="POST /api/auth/login">
                            {`POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "password123"
}

// 성공 응답
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTQ1NjcxMjMsImV4cCI6MTY5NDY1MzUyM30.ABC123...",
    "userId": 1,
    "username": "testuser",
    "email": "test@example.com",
    "role": "USER"
}`}
                        </CodeBlock>

                        <h4 className="font-semibold text-gray-800">2. 인증된 API 호출</h4>
                        <CodeBlock title="Protected API 호출">
                            {`POST http://localhost:8080/api/players
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
    "name": "Player1"
}`}
                        </CodeBlock>

                        <h4 className="font-semibold text-gray-800">3. Next.js에서 사용하기</h4>
                        <CodeBlock title="frontend/api.js">
                            {`// 로그인 함수
export const login = async (email, password) => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (data.token) {
    // 토큰을 localStorage에 저장
    localStorage.setItem('token', data.token);
  }
  
  return data;
};

// 인증된 API 호출 함수
export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json',
    },
  });
};

// 사용 예시
const createPlayer = async (playerData) => {
  const response = await authenticatedFetch('http://localhost:8080/api/players', {
    method: 'POST',
    body: JSON.stringify(playerData),
  });
  
  return response.json();
};`}
                        </CodeBlock>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 className="font-medium text-yellow-800 mb-2">보안 고려사항</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• <strong>HTTPS 사용:</strong> 운영환경에서는 반드시 HTTPS로 통신</li>
                                <li>• <strong>토큰 저장:</strong> XSS 공격을 고려해 httpOnly 쿠키 사용 권장</li>
                                <li>• <strong>토큰 만료:</strong> 적절한 만료 시간 설정 (24시간 → 1-2시간)</li>
                                <li>• <strong>Refresh Token:</strong> 장기간 사용을 위한 리프레시 토큰 도입 고려</li>
                            </ul>
                        </div>
                    </div>
                </Step>
            </div>

            {/* 요약 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Check className="mr-2 text-green-600" size={20} />
                    구현 완료 체크리스트
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">백엔드 구현</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>✅ JWT 라이브러리 추가</li>
                            <li>✅ JwtUtil 토큰 유틸리티</li>
                            <li>✅ 이메일 로그인 API</li>
                            <li>✅ JWT 인증 필터</li>
                            <li>✅ SecurityConfig 설정</li>
                            <li>✅ CORS 설정</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800 mb-2">프론트엔드 연동</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>✅ 로그인 API 호출</li>
                            <li>✅ JWT 토큰 저장</li>
                            <li>✅ Authorization 헤더 설정</li>
                            <li>✅ 인증된 API 요청</li>
                            <li>🔄 토큰 만료 처리 (선택사항)</li>
                            <li>🔄 자동 로그아웃 (선택사항)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpringSecurityJWTGuide;