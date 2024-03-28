///Yael Koppel 211503545

#include <iostream>
#include <cmath>
using namespace std;


void main()
{
	int option=0, height, width, triangleOption, lines=0, extra, duplicate, currentWidth, realDuplicate=0;

	while(option!=3)
	{
		cout << "for rectangle choose 1 and for triangle choose 2: ";
		cin >> option;
				
		switch (option)
		{
		case 1:
			cout << "enter height and width: ";
			cin >> height >> width;
			if (height - width > 5 || height - width < -5)
				cout <<"Rectangle's area: "<< height * width<<'\n';
			else cout << "Rectangle's circumference: " << height * 2 + width * 2<<'\n';
			break;
		case 2:
			cout << "enter height and width: ";
			cin >> height >> width;
			cout << "choose an option: ";
			cin >> triangleOption;
			switch (triangleOption)
			{
			case 1:
				cout <<"Triangle's circumference: "<< sqrt(pow(0.5 * width, 2) + pow(height, 2)) * 2 + width << '\n';
				break;
			case 2:
				if (width % 2 == 0 || width > 2 * height)
					cout << "The triangle cannot be printed" << '\n';
				else
				{
					lines = (width / 2) - 1;		  //How many lines of different length should be printed
					duplicate = (height - 2) / lines; //How many lines of each length should be printed
					extra = (height - 2) % lines;	  //How many extra '***' lines should be printed

					//top of the triagle
					for (int k = 0; k < (width - 1) / 2; k++)
						cout << " ";
					cout << "*\n";

					/*for (int i = 0; i < extra; i++)
					{
						for (int k = 0; k < (width - 3) / 2; k++)
							cout << " ";
						cout << "***\n";
					}*/

					currentWidth = 3; // 3+2*lines

					//option 2
					realDuplicate = duplicate;
					duplicate += extra;

					for (int i = 0; i < lines; i++)
					{
						for (int j = 0; j < duplicate; j++)
						{
							//print spaces so the * will be in the middle
							for (int k = 0; k < (width - currentWidth) / 2; k++)
								cout << " ";
							for (int k = 0; k < currentWidth; k++)
							cout << "*";
							cout << "\n";
						}
						currentWidth += 2;
						duplicate = realDuplicate;
					}

					//base of the triangle
					for (int k = 0; k < currentWidth; k++)
						cout << "*";
					cout << "\n";
				}
			break;
			
			default:
				break;
			}
		case 3:
			return;
		}
	
	}
}
