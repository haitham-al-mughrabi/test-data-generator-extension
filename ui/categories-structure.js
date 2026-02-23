// New categories structure with sub-tabs
const categoriesWithSubTabs = [
  { 
    title: 'Personal', 
    subTabs: [
      {
        title: 'Identity',
        fields: [
          { id: 'firstName', label: 'First Name (EN)' }, 
          { id: 'firstNameAr', label: 'First Name (AR)' }, 
          { id: 'lastName', label: 'Last Name (EN)' }, 
          { id: 'lastNameAr', label: 'Last Name (AR)' }, 
          { id: 'fullName', label: 'Full Name (EN)' }, 
          { id: 'fullNameAr', label: 'Full Name (AR)' }, 
          { id: 'gender', label: 'Gender (EN)' }, 
          { id: 'genderAr', label: 'Gender (AR)' }
        ]
      },
      {
        title: 'Demographics',
        fields: [
          { id: 'birthdate', label: 'Birthdate' }, 
          { id: 'age', label: 'Age' }, 
          { id: 'nationality', label: 'Nationality (EN)' }, 
          { id: 'nationalityAr', label: 'Nationality (AR)' }, 
          { id: 'bloodType', label: 'Blood Type' }, 
          { id: 'maritalStatus', label: 'Marital Status (EN)' }, 
          { id: 'maritalStatusAr', label: 'Marital Status (AR)' },
          { id: 'religion', label: 'Religion (EN)' },
          { id: 'religionAr', label: 'Religion (AR)' }
        ]
      },
      {
        title: 'Documents',
        fields: [
          { id: 'saudiId', label: 'Saudi ID' }, 
          { id: 'iqamaNumber', label: 'Iqama Number' }, 
          { id: 'borderNumber', label: 'Border Number' }, 
          { id: 'passportNumber', label: 'Passport Number' }
        ]
      }
    ]
  },
  { 
    title: 'Contact', 
    subTabs: [
      {
        title: 'Communication',
        fields: [
          { id: 'email', label: 'Email' }, 
          { id: 'mobileNumber', label: 'Mobile Number' },
          { id: 'landlineNumber', label: 'Landline Number' },
          { id: 'whatsappNumber', label: 'WhatsApp Number' }
        ]
      },
      {
        title: 'Address',
        fields: [
          { id: 'address', label: 'Address (EN)' }, 
          { id: 'addressAr', label: 'Address (AR)' }, 
          { id: 'nationalAddress', label: 'National Address' },
          { id: 'city', label: 'City (EN)' }, 
          { id: 'cityAr', label: 'City (AR)' }, 
          { id: 'district', label: 'District (EN)' },
          { id: 'districtAr', label: 'District (AR)' },
          { id: 'street', label: 'Street (EN)' },
          { id: 'streetAr', label: 'Street (AR)' },
          { id: 'buildingNumber', label: 'Building Number' },
          { id: 'unitNumber', label: 'Unit Number' },
          { id: 'postalCode', label: 'Postal Code' }, 
          { id: 'additionalNumber', label: 'Additional Number' }
        ]
      },
      {
        title: 'Location',
        fields: [
          { id: 'country', label: 'Country (EN)' }, 
          { id: 'countryAr', label: 'Country (AR)' },
          { id: 'region', label: 'Region (EN)' },
          { id: 'regionAr', label: 'Region (AR)' },
          { id: 'province', label: 'Province (EN)' },
          { id: 'provinceAr', label: 'Province (AR)' }
        ]
      }
    ]
  },
  { 
    title: 'Business', 
    subTabs: [
      {
        title: 'Work Info',
        fields: [
          { id: 'company', label: 'Company' }, 
          { id: 'jobTitle', label: 'Job Title (EN)' }, 
          { id: 'jobTitleAr', label: 'Job Title (AR)' }, 
          { id: 'department', label: 'Department (EN)' }, 
          { id: 'departmentAr', label: 'Department (AR)' },
          { id: 'workLocation', label: 'Work Location (EN)' },
          { id: 'workLocationAr', label: 'Work Location (AR)' }
        ]
      },
      {
        title: 'Employment',
        fields: [
          { id: 'salary', label: 'Salary' }, 
          { id: 'workEmail', label: 'Work Email' },
          { id: 'workPhone', label: 'Work Phone' },
          { id: 'employeeId', label: 'Employee ID' },
          { id: 'workExperience', label: 'Experience (Years)' }
        ]
      },
      {
        title: 'Government',
        fields: [
          { id: 'commercialRegister', label: 'Commercial Register' },
          { id: 'taxNumber', label: 'Tax Number (VAT)' },
          { id: 'municipalLicense', label: 'Municipal License' },
          { id: 'chamberMembership', label: 'Chamber Membership' },
          { id: 'socialInsurance', label: 'Social Insurance (GOSI)' },
          { id: 'laborOfficeNumber', label: 'Labor Office Number' },
          { id: 'zakat', label: 'Zakat Number' },
          { id: 'customsCode', label: 'Customs Code' }
        ]
      }
    ]
  },
  { 
    title: 'Enhanced Personal', 
    subTabs: [
      {
        title: 'Personality & Traits',
        fields: [
          { id: 'personalityTrait', label: 'Personality Trait (EN)' },
          { id: 'personalityTraitAr', label: 'Personality Trait (AR)' },
          { id: 'personalityScore', label: 'Personality Score' },
          { id: 'lifestyleChoice', label: 'Lifestyle (EN)' },
          { id: 'lifestyleChoiceAr', label: 'Lifestyle (AR)' },
          { id: 'eyeColor', label: 'Eye Color (EN)' },
          { id: 'eyeColorAr', label: 'Eye Color (AR)' },
          { id: 'hairColor', label: 'Hair Color (EN)' },
          { id: 'hairColorAr', label: 'Hair Color (AR)' }
        ]
      },
      {
        title: 'Interests & Skills',
        fields: [
          { id: 'hobby', label: 'Hobby (EN)' },
          { id: 'hobbyAr', label: 'Hobby (AR)' },
          { id: 'hobbiesList', label: 'Hobbies List (EN)' },
          { id: 'hobbiesListAr', label: 'Hobbies List (AR)' },
          { id: 'skill', label: 'Skill (EN)' },
          { id: 'skillAr', label: 'Skill (AR)' },
          { id: 'skillsList', label: 'Skills List (EN)' },
          { id: 'language', label: 'Language (EN)' },
          { id: 'languageAr', label: 'Language (AR)' },
          { id: 'languagesList', label: 'Languages List (EN)' }
        ]
      },
      {
        title: 'Preferences & Background',
        fields: [
          { id: 'favoriteColor', label: 'Favorite Color (EN)' },
          { id: 'favoriteColorAr', label: 'Favorite Color (AR)' },
          { id: 'favoriteFood', label: 'Favorite Food (EN)' },
          { id: 'favoriteFoodAr', label: 'Favorite Food (AR)' },
          { id: 'favoriteMusic', label: 'Favorite Music (EN)' },
          { id: 'favoriteMusicAr', label: 'Favorite Music (AR)' },
          { id: 'birthPlace', label: 'Birth Place (EN)' },
          { id: 'birthPlaceAr', label: 'Birth Place (AR)' },
          { id: 'motherTongue', label: 'Mother Tongue (EN)' },
          { id: 'motherTongueAr', label: 'Mother Tongue (AR)' }
        ]
      },
      {
        title: 'Medical & Emergency',
        fields: [
          { id: 'medicalAllergy', label: 'Medical Allergy (EN)' },
          { id: 'medicalAllergyAr', label: 'Medical Allergy (AR)' },
          { id: 'medication', label: 'Medication (EN)' },
          { id: 'medicationAr', label: 'Medication (AR)' },
          { id: 'medicalCondition', label: 'Medical Condition (EN)' },
          { id: 'medicalConditionAr', label: 'Medical Condition (AR)' },
          { id: 'emergencyContactName', label: 'Emergency Contact (EN)' },
          { id: 'emergencyContactNameAr', label: 'Emergency Contact (AR)' },
          { id: 'emergencyContactPhone', label: 'Emergency Contact Phone' },
          { id: 'biometricId', label: 'Biometric ID' }
        ]
      }
    ]
  },
  { 
    title: 'Files & Media', 
    subTabs: [
      {
        title: 'File Information',
        fields: [
          { id: 'fileName', label: 'File Name (EN)' },
          { id: 'fileNameAr', label: 'File Name (AR)' },
          { id: 'fileExtension', label: 'File Extension' },
          { id: 'fileType', label: 'File Type' },
          { id: 'mimeType', label: 'MIME Type' },
          { id: 'fileSize', label: 'File Size' },
          { id: 'fileSizeBytes', label: 'File Size (Bytes)' },
          { id: 'documentPath', label: 'Document Path (EN)' },
          { id: 'documentPathAr', label: 'Document Path (AR)' }
        ]
      },
      {
        title: 'Document Management',
        fields: [
          { id: 'documentType', label: 'Document Type (EN)' },
          { id: 'documentTypeAr', label: 'Document Type (AR)' },
          { id: 'documentCategory', label: 'Document Category' },
          { id: 'documentNumber', label: 'Document Number' },
          { id: 'referenceNumber', label: 'Reference Number' },
          { id: 'documentVersion', label: 'Document Version' },
          { id: 'documentStatus', label: 'Document Status (EN)' },
          { id: 'documentStatusAr', label: 'Document Status (AR)' },
          { id: 'documentPriority', label: 'Document Priority (EN)' },
          { id: 'documentPriorityAr', label: 'Document Priority (AR)' }
        ]
      },
      {
        title: 'Document Details',
        fields: [
          { id: 'documentTitle', label: 'Document Title (EN)' },
          { id: 'documentTitleAr', label: 'Document Title (AR)' },
          { id: 'documentFileName', label: 'Document File Name (EN)' },
          { id: 'documentFileNameAr', label: 'Document File Name (AR)' },
          { id: 'documentAuthor', label: 'Document Author (EN)' },
          { id: 'documentAuthorAr', label: 'Document Author (AR)' },
          { id: 'pageCount', label: 'Page Count' },
          { id: 'wordCount', label: 'Word Count' },
          { id: 'createdDate', label: 'Created Date' },
          { id: 'modifiedDate', label: 'Modified Date' }
        ]
      },
      {
        title: 'Media URLs',
        fields: [
          { id: 'downloadUrl', label: 'Download URL' },
          { id: 'thumbnailUrl', label: 'Thumbnail URL' },
          { id: 'cloudStorageUrl', label: 'Cloud Storage URL' },
          { id: 'mediaFormat', label: 'Media Format' },
          { id: 'resolution', label: 'Resolution' },
          { id: 'colorDepth', label: 'Color Depth' },
          { id: 'compressionRatio', label: 'Compression Ratio' },
          { id: 'metadata', label: 'Metadata' }
        ]
      },
    ]
  },
  { 
    title: 'Images & Avatars', 
    subTabs: [
      {
        title: 'Placeholder Images',
        fields: [
          { id: 'imageDimensions', label: 'Current Dimensions' },
          { id: 'imageWidth', label: 'Width (px)' },
          { id: 'imageHeight', label: 'Height (px)' },
          { id: 'imageAspectRatio', label: 'Aspect Ratio' },
          { id: 'placeholderImage', label: 'Placeholder Image' },
          { id: 'placeholderImageWithText', label: 'Placeholder with Text' },
          { id: 'placeholderImageColored', label: 'Colored Placeholder' },
          { id: 'placeholderCom', label: 'Placeholder.com' },
          { id: 'dummyImage', label: 'DummyImage.com' },
          { id: 'fakeImg', label: 'FakeImg.pl' }
        ]
      },
      {
        title: 'Real Photos',
        fields: [
          { id: 'loremPicsumImage', label: 'Lorem Picsum Image' },
          { id: 'loremPicsumImageWithId', label: 'Lorem Picsum with ID' },
          { id: 'loremPicsumGrayscale', label: 'Lorem Picsum Grayscale' },
          { id: 'loremPicsumBlurred', label: 'Lorem Picsum Blurred' },
          { id: 'unsplashImage', label: 'Unsplash Image' },
          { id: 'unsplashFeaturedImage', label: 'Unsplash Featured' },
          { id: 'unsplashDailyImage', label: 'Unsplash Daily' },
          { id: 'imageUrl', label: 'Random Image URL' }
        ]
      },
      {
        title: 'Avatar Generators',
        fields: [
          { id: 'avatarUrl', label: 'Avatar URL' },
          { id: 'avatarDiceBear', label: 'DiceBear Avatar' },
          { id: 'avatarRobohash', label: 'Robohash Avatar' },
          { id: 'avatarPravatar', label: 'Pravatar Avatar' },
          { id: 'uiAvatar', label: 'UI Avatar' },
          { id: 'uiAvatarRounded', label: 'UI Avatar Rounded' },
          { id: 'gravatar', label: 'Gravatar' },
          { id: 'facebookProfileImage', label: 'Facebook Profile' },
          { id: 'twitterProfileImage', label: 'Twitter Profile' },
          { id: 'linkedinProfileImage', label: 'LinkedIn Profile' }
        ]
      },
      {
        title: 'Media & Graphics',
        fields: [
          { id: 'sampleVideoUrl', label: 'Sample Video URL' },
          { id: 'youtubeVideoUrl', label: 'YouTube Video URL' },
          { id: 'youtubeThumbnail', label: 'YouTube Thumbnail' },
          { id: 'youtubeThumbnailCustom', label: 'YouTube Thumbnail Custom' },
          { id: 'vimeoVideoUrl', label: 'Vimeo Video URL' },
          { id: 'sampleAudioUrl', label: 'Sample Audio URL' },
          { id: 'qrCodeUrl', label: 'QR Code URL' },
          { id: 'qrCodeColored', label: 'QR Code Colored' },
          { id: 'chartUrl', label: 'Chart URL' },
          { id: 'chartBarUrl', label: 'Bar Chart URL' },
          { id: 'chartPieUrl', label: 'Pie Chart URL' },
          { id: 'mapImage', label: 'Map Image' },
          { id: 'mapImageSatellite', label: 'Satellite Map' },
          { id: 'iconUrl', label: 'Icon URL' },
          { id: 'iconUrlColored', label: 'Colored Icon URL' },
          { id: 'countryFlag', label: 'Country Flag' },
          { id: 'countryFlagRounded', label: 'Country Flag Rounded' },
          { id: 'cdnImageUrl', label: 'CDN Image URL' },
          { id: 'stockPhotoUrl', label: 'Stock Photo URL' }
        ]
      }
    ]
  },
  { 
    title: 'Testing', 
    subTabs: [
      {
        title: 'Email Testing',
        fields: [
          { id: 'validEmail', label: 'Valid Email' },
          { id: 'invalidEmail', label: 'Invalid Email' },
          { id: 'disposableEmail', label: 'Disposable Email' },
          { id: 'corporateEmail', label: 'Corporate Email' },
          { id: 'personalEmail', label: 'Personal Email' },
          { id: 'longEmail', label: 'Long Email' },
          { id: 'shortEmail', label: 'Short Email' },
          { id: 'specialCharEmail', label: 'Special Char Email' },
          { id: 'unicodeEmail', label: 'Unicode Email' },
          { id: 'customEmail', label: 'Custom Email' }
        ]
      },
      {
        title: 'Phone Testing',
        fields: [
          { id: 'customPhone', label: 'Custom Phone' },
          { id: 'mobileNumber', label: 'Mobile (05X)' },
          { id: 'landlineNumber', label: 'Landline (01X)' },
          { id: 'shortMobile', label: 'Short Mobile (5X)' },
          { id: 'shortLandline', label: 'Short Landline (1X)' },
          { id: 'invalidPhone', label: 'Invalid Phone' },
          { id: 'wrongLengthPhone', label: 'Wrong Length' },
          { id: 'internationalPhone', label: 'International (+966)' },
          { id: 'formattedPhone', label: 'Formatted Phone' },
          { id: 'unformattedPhone', label: 'Unformatted Phone' }
        ]
      },
      {
        title: 'Password Testing',
        fields: [
          { id: 'customPassword', label: 'Custom Password' },
          { id: 'strongPassword', label: 'Strong Password' },
          { id: 'weakPassword', label: 'Weak Password' },
          { id: 'numericPassword', label: 'Numeric Password' },
          { id: 'alphaPassword', label: 'Alpha Password' },
          { id: 'specialCharPassword', label: 'Special Char Password' },
          { id: 'longPassword', label: 'Long Password' },
          { id: 'shortPassword', label: 'Short Password' },
          { id: 'commonPassword', label: 'Common Password' },
          { id: 'unicodePassword', label: 'Unicode Password' }
        ]
      }
    ]
  },
  { 
    title: 'Media & Entertainment', 
    subTabs: [
      {
        title: 'Movies & TV',
        fields: [
          { id: 'movieTitle', label: 'Movie Title' },
          { id: 'movieGenre', label: 'Movie Genre' },
          { id: 'movieRating', label: 'Movie Rating' },
          { id: 'movieDuration', label: 'Movie Duration' },
          { id: 'tvShow', label: 'TV Show' },
          { id: 'episodeNumber', label: 'Episode Number' },
          { id: 'releaseYear', label: 'Release Year' },
          { id: 'rating', label: 'Rating' }
        ]
      },
      {
        title: 'Music & Audio',
        fields: [
          { id: 'artist', label: 'Artist' },
          { id: 'songTitle', label: 'Song Title' },
          { id: 'albumTitle', label: 'Album Title' },
          { id: 'musicGenre', label: 'Music Genre' },
          { id: 'duration', label: 'Duration' },
          { id: 'podcastTitle', label: 'Podcast Title' }
        ]
      },
      {
        title: 'Books & Games',
        fields: [
          { id: 'bookTitle', label: 'Book Title' },
          { id: 'author', label: 'Author' },
          { id: 'gameTitle', label: 'Game Title' },
          { id: 'gameGenre', label: 'Game Genre' },
          { id: 'gamePlatform', label: 'Game Platform' }
        ]
      },
      {
        title: 'Social Media',
        fields: [
          { id: 'socialMediaPlatform', label: 'Social Media Platform' },
          { id: 'influencerHandle', label: 'Influencer Handle' },
          { id: 'contentType', label: 'Content Type' },
          { id: 'viewCount', label: 'View Count' },
          { id: 'streamingService', label: 'Streaming Service' }
        ]
      }
    ]
  },
  { 
    title: 'Automotive', 
    subTabs: [
      {
        title: 'Vehicle Info',
        fields: [
          { id: 'carBrand', label: 'Car Brand' },
          { id: 'carModel', label: 'Car Model' },
          { id: 'carYear', label: 'Car Year' },
          { id: 'carColor', label: 'Car Color (EN)' },
          { id: 'carColorAr', label: 'Car Color (AR)' },
          { id: 'vin', label: 'VIN Number' },
          { id: 'licensePlate', label: 'License Plate (AR)' },
          { id: 'licensePlateEn', label: 'License Plate (EN)' }
        ]
      },
      {
        title: 'Technical Specs',
        fields: [
          { id: 'engineSize', label: 'Engine Size' },
          { id: 'fuelType', label: 'Fuel Type (EN)' },
          { id: 'fuelTypeAr', label: 'Fuel Type (AR)' },
          { id: 'transmission', label: 'Transmission (EN)' },
          { id: 'transmissionAr', label: 'Transmission (AR)' },
          { id: 'mileage', label: 'Mileage' },
          { id: 'price', label: 'Price' }
        ]
      },
      {
        title: 'Services & Legal',
        fields: [
          { id: 'insuranceCompany', label: 'Insurance Company' },
          { id: 'insuranceType', label: 'Insurance Type (EN)' },
          { id: 'insuranceTypeAr', label: 'Insurance Type (AR)' },
          { id: 'dealership', label: 'Dealership' },
          { id: 'serviceType', label: 'Service Type (EN)' },
          { id: 'serviceTypeAr', label: 'Service Type (AR)' },
          { id: 'drivingLicenseNumber', label: 'Driving License Number' },
          { id: 'trafficViolation', label: 'Traffic Violation (EN)' },
          { id: 'trafficViolationAr', label: 'Traffic Violation (AR)' },
          { id: 'fineAmount', label: 'Fine Amount' }
        ]
      }
    ]
  },
  { 
    title: 'Weather & Environment', 
    subTabs: [
      {
        title: 'Weather Data',
        fields: [
          { id: 'temperature', label: 'Temperature (°C)' },
          { id: 'temperatureFahrenheit', label: 'Temperature (°F)' },
          { id: 'humidity', label: 'Humidity' },
          { id: 'windSpeed', label: 'Wind Speed' },
          { id: 'windDirection', label: 'Wind Direction (EN)' },
          { id: 'windDirectionAr', label: 'Wind Direction (AR)' },
          { id: 'weatherCondition', label: 'Weather Condition (EN)' },
          { id: 'weatherConditionAr', label: 'Weather Condition (AR)' },
          { id: 'precipitation', label: 'Precipitation' },
          { id: 'visibility', label: 'Visibility' }
        ]
      },
      {
        title: 'Environmental',
        fields: [
          { id: 'airQualityIndex', label: 'Air Quality Index' },
          { id: 'airQuality', label: 'Air Quality (EN)' },
          { id: 'airQualityAr', label: 'Air Quality (AR)' },
          { id: 'uvIndex', label: 'UV Index' },
          { id: 'season', label: 'Season (EN)' },
          { id: 'seasonAr', label: 'Season (AR)' },
          { id: 'climateZone', label: 'Climate Zone (EN)' },
          { id: 'climateZoneAr', label: 'Climate Zone (AR)' }
        ]
      },
      {
        title: 'Nature & Wildlife',
        fields: [
          { id: 'wildlifeSpecies', label: 'Wildlife Species (EN)' },
          { id: 'wildlifeSpeciesAr', label: 'Wildlife Species (AR)' },
          { id: 'plantSpecies', label: 'Plant Species (EN)' },
          { id: 'plantSpeciesAr', label: 'Plant Species (AR)' },
          { id: 'ecosystemType', label: 'Ecosystem Type (EN)' },
          { id: 'ecosystemTypeAr', label: 'Ecosystem Type (AR)' },
          { id: 'waterSource', label: 'Water Source (EN)' },
          { id: 'waterSourceAr', label: 'Water Source (AR)' }
        ]
      }
    ]
  },
  { 
    title: 'Saudi Services', 
    subTabs: [
      {
        title: 'Hajj & Umrah',
        fields: [
          { id: 'hajjId', label: 'Hajj ID' },
          { id: 'umrahId', label: 'Umrah ID' }
        ]
      },
      {
        title: 'Work & Residency',
        fields: [
          { id: 'workPermit', label: 'Work Permit' },
          { id: 'residencyId', label: 'Residency ID' },
          { id: 'drivingLicense', label: 'Driving License' }
        ]
      },
      {
        title: 'Vehicle Services',
        fields: [
          { id: 'vehicleRegistration', label: 'Vehicle Registration' },
          { id: 'istmara', label: 'Istmara' },
          { id: 'trafficViolation', label: 'Traffic Violation' }
        ]
      },
      {
        title: 'Health Services',
        fields: [
          { id: 'healthCard', label: 'Health Card' },
          { id: 'vaccinationCertificate', label: 'Vaccination Certificate' },
          { id: 'covidCertificate', label: 'COVID Certificate' }
        ]
      }
    ]
  },
  { 
    title: 'Healthcare Extended', 
    subTabs: [
      {
        title: 'Medical Data',
        fields: [
          { id: 'allergies', label: 'Allergies' },
          { id: 'bloodPressure', label: 'Blood Pressure' },
          { id: 'heartRate', label: 'Heart Rate' }
        ]
      }
    ]
  },
  { 
    title: 'Travel & Tourism', 
    subTabs: [
      {
        title: 'Flight Info',
        fields: [
          { id: 'flightNumber', label: 'Flight Number' },
          { id: 'airline', label: 'Airline' },
          { id: 'airportCode', label: 'Airport Code' },
          { id: 'seatNumber', label: 'Seat Number' }
        ]
      },
      {
        title: 'Accommodation',
        fields: [
          { id: 'hotelName', label: 'Hotel Name' },
          { id: 'bookingReference', label: 'Booking Reference' }
        ]
      }
    ]
  },
  { 
    title: 'Entertainment & Media', 
    subTabs: [
      {
        title: 'Movies & Shows',
        fields: [
          { id: 'movieTitle', label: 'Movie Title' },
          { id: 'actorName', label: 'Actor Name' },
          { id: 'director', label: 'Director' },
          { id: 'genre', label: 'Genre' },
          { id: 'rating', label: 'Rating' },
          { id: 'review', label: 'Review' }
        ]
      }
    ]
  },
  { 
    title: 'Sports & Fitness', 
    subTabs: [
      {
        title: 'Sports Data',
        fields: [
          { id: 'teamName', label: 'Team Name' },
          { id: 'playerName', label: 'Player Name' },
          { id: 'sportType', label: 'Sport Type' },
          { id: 'score', label: 'Score' },
          { id: 'stadium', label: 'Stadium' },
          { id: 'league', label: 'League' }
        ]
      }
    ]
  },
  { 
    title: 'Food & Restaurant', 
    subTabs: [
      {
        title: 'Menu Items',
        fields: [
          { id: 'dishName', label: 'Dish Name (EN)' },
          { id: 'dishNameAr', label: 'Dish Name (AR)' },
          { id: 'restaurantName', label: 'Restaurant Name' },
          { id: 'cuisineType', label: 'Cuisine Type' },
          { id: 'menuItem', label: 'Menu Item' },
          { id: 'recipe', label: 'Recipe' }
        ]
      }
    ]
  },
  { 
    title: 'Social Media', 
    subTabs: [
      {
        title: 'Profile Data',
        fields: [
          { id: 'username', label: 'Username' },
          { id: 'handle', label: 'Handle' },
          { id: 'bio', label: 'Bio' },
          { id: 'hashtag', label: 'Hashtag' },
          { id: 'postContent', label: 'Post Content' },
          { id: 'comment', label: 'Comment' }
        ]
      }
    ]
  },
  { 
    title: 'Gaming', 
    subTabs: [
      {
        title: 'Game Data',
        fields: [
          { id: 'gamerTag', label: 'Gamer Tag' },
          { id: 'gameTitle', label: 'Game Title' },
          { id: 'highScore', label: 'High Score' },
          { id: 'level', label: 'Level' },
          { id: 'achievement', label: 'Achievement' },
          { id: 'guildName', label: 'Guild Name' }
        ]
      }
    ]
  },
  { 
    title: 'Technology Extended', 
    subTabs: [
      {
        title: 'Server & Network',
        fields: [
          { id: 'portNumber', label: 'Port Number' },
          { id: 'version', label: 'Version' },
          { id: 'buildNumber', label: 'Build Number' }
        ]
      }
    ]
  },
  { 
    title: 'Email Testing', 
    subTabs: [
      {
        title: 'Email Variants',
        fields: [
          { id: 'validEmail', label: 'Valid Email' },
          { id: 'invalidEmail', label: 'Invalid Email' },
          { id: 'disposableEmail', label: 'Disposable Email' },
          { id: 'corporateEmail', label: 'Corporate Email' },
          { id: 'personalEmail', label: 'Personal Email' },
          { id: 'longEmail', label: 'Long Email' },
          { id: 'shortEmail', label: 'Short Email' },
          { id: 'specialCharEmail', label: 'Special Char Email' },
          { id: 'unicodeEmail', label: 'Unicode Email' },
          { id: 'customEmail', label: 'Custom Email' }
        ]
      }
    ]
  },
  { 
    title: 'Password Testing', 
    subTabs: [
      {
        title: 'Password Variants',
        fields: [
          { id: 'customPassword', label: 'Custom Password' },
          { id: 'strongPassword', label: 'Strong Password' },
          { id: 'weakPassword', label: 'Weak Password' },
          { id: 'numericPassword', label: 'Numeric Password' },
          { id: 'alphaPassword', label: 'Alpha Password' },
          { id: 'specialCharPassword', label: 'Special Char Password' },
          { id: 'longPassword', label: 'Long Password' },
          { id: 'shortPassword', label: 'Short Password' },
          { id: 'commonPassword', label: 'Common Password' },
          { id: 'unicodePassword', label: 'Unicode Password' }
        ]
      }
    ]
  },
  { 
    title: 'Cryptocurrency', 
    subTabs: [
      {
        title: 'Crypto Assets',
        fields: [
          { id: 'cryptoSymbol', label: 'Crypto Symbol' },
          { id: 'cryptoName', label: 'Crypto Name' },
          { id: 'cryptoPrice', label: 'Price (USD)' },
          { id: 'cryptoPriceSAR', label: 'Price (SAR)' },
          { id: 'marketCap', label: 'Market Cap' },
          { id: 'volume24h', label: '24h Volume' },
          { id: 'priceChange24h', label: '24h Change' }
        ]
      },
      {
        title: 'Wallets & Transactions',
        fields: [
          { id: 'walletAddress', label: 'Wallet Address' },
          { id: 'ethereumAddress', label: 'Ethereum Address' },
          { id: 'transactionHash', label: 'Transaction Hash' },
          { id: 'transactionFee', label: 'Transaction Fee (ETH)' },
          { id: 'transactionFeeSAR', label: 'Transaction Fee (SAR)' },
          { id: 'gasPrice', label: 'Gas Price' },
          { id: 'blockHeight', label: 'Block Height' }
        ]
      },
      {
        title: 'DeFi & Trading',
        fields: [
          { id: 'stakingReward', label: 'Staking Reward' },
          { id: 'yieldFarming', label: 'Yield Farming APY' },
          { id: 'liquidityPool', label: 'Liquidity Pool' },
          { id: 'dexName', label: 'DEX Name' },
          { id: 'tradingPair', label: 'Trading Pair' },
          { id: 'portfolioValue', label: 'Portfolio Value (USD)' },
          { id: 'portfolioValueSAR', label: 'Portfolio Value (SAR)' },
          { id: 'roi', label: 'ROI' }
        ]
      }
    ]
  },
  { 
    title: 'IoT & Smart Home', 
    subTabs: [
      {
        title: 'Device Info',
        fields: [
          { id: 'deviceType', label: 'Device Type (EN)' },
          { id: 'deviceTypeAr', label: 'Device Type (AR)' },
          { id: 'deviceBrand', label: 'Device Brand' },
          { id: 'deviceModel', label: 'Device Model' },
          { id: 'deviceId', label: 'Device ID' },
          { id: 'macAddress', label: 'MAC Address' },
          { id: 'ipAddress', label: 'IP Address' },
          { id: 'firmwareVersion', label: 'Firmware Version' }
        ]
      },
      {
        title: 'Connectivity',
        fields: [
          { id: 'wifiSSID', label: 'WiFi SSID' },
          { id: 'signalStrength', label: 'Signal Strength' },
          { id: 'communicationProtocol', label: 'Communication Protocol' },
          { id: 'deviceStatus', label: 'Device Status (EN)' },
          { id: 'deviceStatusAr', label: 'Device Status (AR)' },
          { id: 'batteryLevel', label: 'Battery Level' },
          { id: 'powerConsumption', label: 'Power Consumption' }
        ]
      },
      {
        title: 'Automation',
        fields: [
          { id: 'automationRule', label: 'Automation Rule (EN)' },
          { id: 'automationRuleAr', label: 'Automation Rule (AR)' },
          { id: 'sceneMode', label: 'Scene Mode (EN)' },
          { id: 'sceneModeAr', label: 'Scene Mode (AR)' },
          { id: 'voiceCommand', label: 'Voice Command (EN)' },
          { id: 'voiceCommandAr', label: 'Voice Command (AR)' },
          { id: 'alertType', label: 'Alert Type (EN)' },
          { id: 'alertTypeAr', label: 'Alert Type (AR)' }
        ]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { categoriesWithSubTabs };
} else if (typeof window !== 'undefined') {
  window.categoriesWithSubTabs = categoriesWithSubTabs;
}
