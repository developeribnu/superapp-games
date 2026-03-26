FROM php:7.4-apache

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    curl \
    wget \
    git \
    unzip \
    mariadb-client \
    redis-tools \
    cron \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd mysqli pdo pdo_mysql zip mbstring xml curl \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache modules
RUN a2enmod rewrite headers expires deflate ssl

# Configure PHP for production
RUN { \
    echo 'memory_limit = 512M'; \
    echo 'max_execution_time = 300'; \
    echo 'max_input_vars = 3000'; \
    echo 'post_max_size = 50M'; \
    echo 'upload_max_filesize = 50M'; \
    echo 'date.timezone = Asia/Jakarta'; \
    echo 'session.gc_maxlifetime = 86400'; \
    echo 'opcache.enable = 1'; \
    echo 'opcache.memory_consumption = 256'; \
    echo 'opcache.max_accelerated_files = 20000'; \
    echo 'opcache.validate_timestamps = 0'; \
} > /usr/local/etc/php/conf.d/production.ini

# Configure Apache
RUN { \
    echo '<Directory /var/www/html>'; \
    echo '    Options Indexes FollowSymLinks'; \
    echo '    AllowOverride All'; \
    echo '    Require all granted'; \
    echo '</Directory>'; \
    echo ''; \
    echo 'ServerName localhost'; \
    echo 'ServerSignature Off'; \
    echo 'ServerTokens Prod'; \
} >> /etc/apache2/apache2.conf

# Set working directory
WORKDIR /var/www/html

# Create log directories
RUN mkdir -p /var/log/apache2 /var/log/travian /var/log/cron /backups

# Set permissions
RUN chown -R www-data:www-data /var/www/html /var/log/apache2 /var/log/travian /var/log/cron /backups

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost/index.php || exit 1

EXPOSE 80 443

CMD ["apache2-foreground"]
