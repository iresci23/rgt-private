# Environment

## Development
Git branch: develop

## Server Requirements
* PHP >= 7.0.0
* Laravel 7.x
* Laravel Voyager 1.4

## IMPORTANT dev notes
* This project uses Laravel Voyager 1.4 for basic crud sections, user authentication, user role permissions so pls check the Voyager documentation for more info: https://docs.laravelvoyager.com/

## Simple installation guide

1. Install laravel 7.*
2. Update your `.env` with your database settings and `APP_URL`
3. Dump the database `rgt_tool.sql` or run `php artisan migrate`
4. Run `composer install` , `php artisan voyager:install` , `php artisan storage:link`, `npm install`
5. (Optional) If you wish to create a new admin user, run `php artisan voyager:admin your@email.com --create`

Done. You can now serve your app.

## Login credentials

```
Superadmin : superadmin@rgt.com/secret
Admin : admin@rgt.com/secret
BA User : user@rgt.com/secret
```

## Troubleshooting

For windows, if `php artisan storage:link` is causing an error: please follow this link 
https://blog.puphpet.com/blog/2015/06/25/windows-symlinks/